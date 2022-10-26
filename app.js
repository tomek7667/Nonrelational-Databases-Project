const neo4j = require("neo4j-driver");
const uri = "bolt://localhost:11003/ctf";
const user = "neo4j";
const password = ".";
const { categories, googleCTF, teams } = require("./data.js");
// include pretty and colorful console logging
const chalk = require("chalk");

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session({
	database: "ctf",
});

function randomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

const addCategory = async ({ name, description }) => {
	return new Promise(async (resolve) => {
		const result = await session.run(
			"CREATE (c:Category {name: $name, description: $description}) RETURN c",
			{ name, description }
		);
		const categoryId = parseInt(result.records[0].get(0).elementId);
		categories.find((c) => c.name === name).id = categoryId;
		return resolve(result);
	});
};

const addChallenge = async ({
	name,
	description,
	category,
	points,
	flag,
	solved_by,
	ctfName,
}) => {
	return new Promise(async (resolve) => {
		const result = await session.run(
			"CREATE (c:Challenge {name: $name, description: $description, points: $points, flag: $flag, ctfName: $ctfName}) RETURN c",
			{ name, description, points, flag, ctfName }
		);
		const challengeId = parseInt(result.records[0].get(0).elementId);
		const categoryNode = categories.find((c) => c.name === category);
		await session.run(
			"MATCH (c:Category), (ch:Challenge) WHERE ID(c) = $categoryId AND ID(ch) = $challengeId CREATE (ch)-[:IS_IN_CATEGORY]->(c)",
			{ categoryId: categoryNode.id, challengeId }
		);
		for (const memberName of solved_by) {
			await session.run(
				"MATCH (m:Member), (ch:Challenge) WHERE m.name = $memberName AND ID(ch) = $challengeId CREATE (m)-[:SOLVED {time: datetime($date)}]->(ch)",
				{
					memberName,
					challengeId,
					date: randomDate(
						new Date(2022, 6, 20),
						new Date(2022, 6, 24)
					).toISOString(),
				}
			);
		}

		return resolve(result);
	});
};

const addTeam = async ({ name, members }) => {
	return new Promise(async (resolve) => {
		const result = await session.run(
			"CREATE (t:Team {name: $name}) RETURN t",
			{ name }
		);
		const teamId = parseInt(result.records[0].get(0).elementId);
		teams.find((t) => t.name === name).id = teamId;
		for (const member of members) {
			// Create members
			const memberResult = await session.run(
				"CREATE (m:Member {name: $name, email: $email}) RETURN m",
				{ name: member.name, email: member.email }
			);
			const memberId = parseInt(memberResult.records[0].get(0).elementId);
			// Create member-team relationship - IS_MEMBER_OF
			await session.run(
				"MATCH (t:Team), (m:Member) WHERE ID(t) = $teamId AND ID(m) = $memberId CREATE (m)-[:IS_MEMBER_OF {since: date($since)}]->(t)",
				{ teamId, memberId, since: member.since }
			);
		}
		return resolve(result);
	});
};

const clearTeams = async () => {
	return new Promise(async (resolve) => {
		const result = await session.run("MATCH (t:Team) DETACH DELETE t");
		return resolve(result);
	});
};

const clearMembers = async () => {
	return new Promise(async (resolve) => {
		const result = await session.run("MATCH (m:Member) DETACH DELETE m");
		return resolve(result);
	});
};

const clearCategories = async () => {
	return new Promise(async (resolve) => {
		const result = await session.run("MATCH (c:Category) DETACH DELETE c");
		return resolve(result);
	});
};

const clearChallenges = async () => {
	return new Promise(async (resolve) => {
		const result = await session.run("MATCH (c:Challenge) DETACH DELETE c");
		return resolve(result);
	});
};

const addCtf = async (ctf) => {
	return new Promise(async (resolve) => {
		for (const category in ctf.challenges) {
			for (const challenge of ctf.challenges[category]) {
				await addChallenge({ ...challenge, ctfName: ctf.name });
			}
		}
		return resolve();
	});
};

const init = async () => {
	return new Promise(async (resolve) => {
		console.log(chalk.red("Clearing the database..."));
		await clearCategories();
		await clearChallenges();
		await clearTeams();
		await clearMembers();
		console.log(chalk.red("Database cleared!"));
		console.log(chalk.green("Adding categories..."));
		for (const category of categories) {
			await addCategory(category);
		}
		console.log(chalk.green("Categories added!"));
		console.log(chalk.green("Adding teams..."));
		for (const team of teams) {
			await addTeam(team);
		}
		console.log(chalk.green("Teams added!"));
		console.log(chalk.green("Adding CTFs..."));
		await addCtf(googleCTF);
		console.log(chalk.green("CTFs added!"));
		return resolve();
	});
};

const createProjections = async () => {
	return new Promise(async (resolve) => {
		console.log(chalk.green("Creating projections..."));
		await session.run(`
		CALL gds.graph.project.cypher(
			'proj1',
			'MATCH (t:Team) RETURN id(t) AS id, labels(t) AS labels',
			'MATCH
			(t1:Team)<--(:Member)-[:SOLVED]->(r:Challenge)<-[:SOLVED]-(:Member)-->(t2:Team)
			 WHERE ID(t1) < ID(t2)
			 RETURN DISTINCT id(t1) AS source, id(t2) AS target, count(r)
			 AS weight'
			)`);
		await session.run(`
		CALL gds.graph.project.cypher(
			'proj2',
			'MATCH (c:Category)<--(:Challenge)<-[r:SOLVED]-(:Member)-->(t:Team) RETURN
			 DISTINCT id(c) AS id, count(r) AS numberOfSolved,
			 labels(c) AS labels',
			'MATCH
			(c1:Category)<--(ch1:Challenge)<-[r1:SOLVED]-(:Member)-->(t:Team)<--(:Member)-[r2:SOLVED]->(ch2:Challenge)-->(c2:Category)
			 WHERE ID(c1) < ID(c2)
			 RETURN DISTINCT id(c1) AS source, id(c2) AS target,
			 sum(ch1.points + ch2.points)
			 AS weight')`);
		await session.run(`
		CALL gds.graph.project.cypher(
			'proj3',
			'MATCH (:Challenge)<-[r:SOLVED]-(m:Member)-->(t:Team) RETURN
			 DISTINCT id(m) AS id, count(r) AS numberOfSolved,
			 labels(m) AS labels',
			'MATCH
			(m1:Member)-[:SOLVED]->(:Challenge)-->(c:Category)<--(:Challenge)<-[:SOLVED]-(m2:Member)
			 WHERE ID(m1) < ID(m2)
			 RETURN DISTINCT id(m1) AS source, id(m2) AS target,
			 count(c) AS weight')`);
		console.log(chalk.green("Projections created!"));
		return resolve();
	});
};

const clearOldProjections = async () => {
	return new Promise(async (resolve) => {
		console.log(chalk.red("Clearing old projections..."));
		try {
			await session.run("CALL gds.graph.drop('proj1')");
			await session.run("CALL gds.graph.drop('proj2')");
			await session.run("CALL gds.graph.drop('proj3')");
		} catch {}
		console.log(chalk.red("Old projections cleared!"));
		return resolve();
	});
};

const main = async () => {
	console.log(chalk.green("Creating the database..."));
	await init();
	console.log(chalk.green("Main init is done!"));
	console.log(chalk.magenta("Main body starts"));
	await clearOldProjections();
	await createProjections();
	await session.close();
	await driver.close();
	return 0;
};

main();
