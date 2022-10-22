const teams = [
	{
		id: undefined,
		name: "justCatTheFish",
		members: [
			{
				id: undefined,
				name: "d1sconn3ct3d",
				email: "d1sconn3ct3d@gmail.com",
				since: "2019-01-01",
			},
			{
				id: undefined,
				name: "szymex73",
				email: "szymex73@gmail.com",
				since: "2020-01-01",
			},
			{
				id: undefined,
				name: "kubawolanin",
				email: "kuba@gmail.com",
				since: "2020-06-04",
			},
		],
	},
	{
		id: undefined,
		name: "ALLES!",
		members: [
			{
				id: undefined,
				name: "LiveOverflow",
				email: "liveoverflow@gmail.com",
				since: "2019-01-01",
			},
			{
				id: undefined,
				name: "d4rk",
				email: "d4rk@gmail.com",
				since: "2020-07-01",
			},
			{
				id: undefined,
				name: "TheVamp",
				email: "thevamp@gmail.com",
				since: "2010-07-01",
			},
		],
	},
	{
		id: undefined,
		name: "The 3 Musketeers",
		members: [
			{
				id: undefined,
				name: "TheRealMusketeer",
				email: "therealmusketeer@gmail.com",
				since: "2019-01-01",
			},
			{
				id: undefined,
				name: "TheFakeMusketeer",
				email: "thefakemusketeer@gmail.com",
				since: "2020-07-01",
			},
			{
				id: undefined,
				name: "TheOtherMusketeer",
				email: "theothermusketeer@gmail.com",
				since: "2010-07-01",
			},
		],
	},
	{
		id: undefined,
		name: "perfect root",
		members: [
			{
				id: undefined,
				name: "Qwaz",
				email: "qwaz@gmail.com",
				since: "2019-01-01",
			},
			{
				id: undefined,
				name: "aaditya_purani",
				email: "aaditya@gmail.com",
				since: "2018-07-21",
			},
			{
				id: undefined,
				name: "m4x",
				email: "m4x@gmail.com",
				since: "2019-02-02",
			},
		],
	},
	{
		id: undefined,
		name: "DiceGang",
		members: [
			{
				id: undefined,
				name: "tux2024",
				email: "tux@gmail.com",
				since: "2019-01-01",
			},
			{
				id: undefined,
				name: "v0ldemort",
				email: "vold@gmail.com",
				since: "2018-07-21",
			},
			{
				id: undefined,
				name: "danx",
				email: "danx@gmail.com",
				since: "2019-02-02",
			},
		],
	},
	{
		id: undefined,
		name: "organizers",
		members: [
			{
				id: undefined,
				name: "gannimo",
				email: "gannimo@gmail.com",
				since: "2019-05-01",
			},
			{
				id: undefined,
				name: "xenocidewiki",
				email: "xeno@gmail.com",
				since: "2018-07-21",
			},
			{
				id: undefined,
				name: "mevz",
				email: "mevz@gmail.com",
				since: "2015-02-02",
			},
		],
	},
];

const categories = [
	{
		id: undefined,
		name: "Web Exploitation",
		description:
			"Web Exploitation is based on the exploitation of web applications. This includes the exploitation of web servers, web applications, and web clients. Web Exploitation is a broad category that includes many different types of vulnerabilities and exploitation techniques.",
	},
	{
		id: undefined,
		name: "Binary Exploitation",
		description:
			"Binary Exploitation (known also as pwn) is based on the exploitation of binary executables. This includes the exploitation of binaries, libraries, and operating systems. Binary Exploitation is a broad category that includes many different types of vulnerabilities and exploitation techniques.",
	},
	{
		id: undefined,
		name: "Cryptography",
		description:
			"Cryptography is based on the use of cryptography to solve challenges. This includes the use of encryption, hashing, and steganography. Cryptography is a broad category that includes many different types of challenges.",
	},
	{
		id: undefined,
		name: "Reverse Engineering",
		description:
			"Reverse Engineering is based on the analysis of binary executables. This includes the analysis of binaries, libraries, and operating systems. Reverse Engineering is a broad category that includes many different types of challenges.",
	},
	{
		id: undefined,
		name: "Hardware",
		description:
			"Hardware is based on the exploitation of hardware devices. This includes the exploitation of microcontrollers, FPGAs, and other hardware devices. Hardware is a broad category that includes many different types of challenges.",
	},
	{
		id: undefined,
		name: "Miscellaneous",
		description:
			"Miscellaneous is based on the solving of miscellaneous challenges. This includes the solving of challenges that do not fit into any other category. Miscellaneous is a broad category that includes many different types of challenges.",
	},
];

const googleCTF = {
	name: "Google CTF",
	challenges: {
		misc: [
			{
				id: undefined,
				name: "APPNOTE.TXT",
				description:
					"Every single archive manager unpacks this to a different file...",
				category: "Miscellaneous",
				points: 50,
				flag: "flag{7h3r3_15_4lw4y5_4_w4y}",
				solved_by: ["TheVamp", "TheRealMusketeer", "Qwaz"],
			},
			{
				id: undefined,
				name: "LEGIT",
				description:
					"I built this CLI for exploring git repositories. It's still WIP but I find it pretty cool! What do you think about it? NOTE: the challenge can reach the internet but has a tight limit on repository size.",
				category: "Miscellaneous",
				points: 201,
				flag: "flag{g1t_15_4w350m3}",
				solved_by: ["ganimo", "szymex73", "tux2024"],
			},
			{
				id: undefined,
				name: "MLSTEAL",
				description:
					'Alice trained a neural network language model as her own personal assistant Unfortunately, she accidentally included her password in the training dataset prefixed by "Alice Bobson\'s password is".',
				category: "Miscellaneous",
				points: 118,
				flag: "flag{p4ssw0rd_1s_4l1c3}",
				solved_by: ["TheOtherMusketeer", "m4x"],
			},
			{
				id: undefined,
				name: "OCR",
				description: `Train our neural network to read handwritten letters! I'm sure with the newest technological advances, you'll be able to do it with a tiny network and just a handful of training images.`,
				category: "Miscellaneous",
				points: 208,
				flag: "flag{y0u_4r3_4_m4ch1n3}",
				solved_by: ["LiveOverflow", "d1sconn3ct3d"],
			},
			{
				id: undefined,
				name: "SEGFAULT LABYRINTH",
				description:
					"Be careful! One wrong turn and the whole thing comes crashing down",
				category: "Miscellaneous",
				points: 189,
				flag: "flag{inside_the_maze}",
				solved_by: [
					"TheVamp",
					"TheRealMusketeer",
					"Qwaz",
					"kubawolanin",
				],
			},
		],
		hardware: [
			{
				id: undefined,
				name: "ENGRAVER",
				description: `You can see pictures of a robot arm laser engraver attached. 
            Can you figure out what it is engraving? 
            
            Note: the flag should be entered all in upper case. It contains underscores but does not contain dashes.
            
            Good luck!`,
				category: "Hardware",
				points: 199,
				flag: "flag{3NCR4V3R_15_4W350M3}",
				solved_by: ["d1sconn3ct3d", "Qwaz"],
			},
			{
				id: undefined,
				name: "ILIKETRAINS",
				description: `I created this special map for all those OpenTTD fans out there, enjoy!
        
            Note: Non-standard flag format, use CTF{bits}`,
				category: "Hardware",
				points: 314,
				flag: "flag{0101110101111101010111}",
				solved_by: ["kubawolanin", "d4rk", "m4x"],
			},
			{
				id: undefined,
				name: "WEATHER",
				description: `Our DYI Weather Station is fully secure! No, really! Why are you laughing?! OK, to prove it we're going to put a flag in the internal ROM, give you the source code, datasheet, and network access to the interface.`,
				category: "Hardware",
				points: 141,
				flag: "flag{w3ath3r_15_4w350m3}",
				solved_by: ["szymex73", "TheFakeMusketeer", "aaditya_purani"],
			},
		],
		crypto: [
			{
				id: undefined,
				name: "CUSTOM PROTOCOL",
				description: `I like to implement crypto myself. Please, take a look at my new implementation. It looks amazing, right?`,
				category: "Cryptography",
				points: 420,
				flag: "flag{c0st0m_pr0t0c0l_15_4w350m3}",
				solved_by: ["szymex73"],
			},
			{
				id: undefined,
				name: "CYCLING",
				description: `It is well known that any RSA encryption can be undone by just encrypting the ciphertext over and over again.
                If the RSA modulus has been chosen badly then the number of encryptions necessary to undo an encryption is small.
                However, if the modulus is well chosen then a cycle attack can take much longer. This property can be used for a timed release of a message.
                We have confirmed that it takes a whopping 2^1025-3 encryptions to decrypt the flag.
                Pack out your quantum computer and perform 2^1025-3 encryptions to solve this challenge. Good luck doing this in 48h.`,
				category: "Cryptography",
				points: 500,
				flag: "flag{G00d_luck_w1th_y0ur_Qu4ntum_c0mput3r}",
				solved_by: [],
			},
			{
				id: undefined,
				name: "ELECTRIC MAYHEM CLS",
				description: `The server presents power traces of a secret firmware crypto operation. The goal is to recover the secret key.
                Note, the flag is 'CTF{XXX}' where XXX is your recovered key.`,
				category: "Cryptography",
				points: 164,
				flag: "flag{12038123213847960127634089716234}",
				solved_by: ["aaditya_purani", "TheRealMusketeer", "TheVamp"],
			},
			{
				id: undefined,
				name: "ELECTRIC MAYHEM PQC",
				description: `The server presents power traces of a secret firmware crypto operation. The goal is to recover the secret key.`,
				category: "Cryptography",
				points: 453,
				flag: "flag{S0_1f_y0u_w4nt_t0_b3_4_p1r4t3_y0u_h4v3_t0_b3_4_p1r4t3}",
				solved_by: ["v0ldemort"],
			},
		],
		pwn: [
			{
				id: undefined,
				name: "D8",
				description: `d8 is a service allowing users to run javascript in an isolated sandbox.`,
				category: "Binary Exploitation",
				points: 420,
				flag: "flag{d8_15_4w350m3}",
				solved_by: ["aaditya_purani", "d1sconn3ct3d"],
			},
			{
				id: undefined,
				name: "FIXEDASLR",
				description: `I wasn't happy with the default ASLR, so I fixed it. The flag is in a file called "flag" both in / and cwd.`,
				category: "Binary Exploitation",
				points: 240,
				flag: "flag{f1x3d_4slr_15_4w350m3}",
				solved_by: ["aaditya_purani", "TheOldMusketeer"],
			},
			{
				id: undefined,
				name: "MADCORE",
				description: `My coredump helper is crashing while handling a crash : (`,
				category: "Binary Exploitation",
				points: 500,
				flag: "flag{m4d_c0r3_15_4w350m3}",
				solved_by: [],
			},
		],
		rev: [
			{
				id: undefined,
				name: "ELDAR",
				description: `We found this app on a recent Ubuntu system, but the serial is missing from 'serial.c'. Can you figure out a valid serial?`,
				category: "Reverse Engineering",
				points: 333,
				flag: "flag{3LD4R_15_4W350M3}",
				solved_by: ["aaditya_purani", "TheRealMusketeer", "d4rk"],
			},
			{
				id: undefined,
				name: "JS SAFE 4.0",
				description: `You stumbled upon someone's "JS Safe" on the web. It's a simple HTML file that can store secrets in the browser's localStorage. This means that you won't be able to extract any secret from it (the secrets are on the computer of the owner), but it looks like it was hand-crafted to work only with the password of the owner...`,
				category: "Reverse Engineering",
				points: 152,
				flag: "flag{J5_S4F3_4.0_15_4W350M3}",
				solved_by: ["xenocidewiki", "TheVamp"],
			},
			{
				id: undefined,
				name: "MIXED",
				description: `A company I interview for gave me a test to solve. I'd decompile it and get the answer that way, but they seem to use some custom Python version... At least I know it's based on commit 64113a4ba801126028505c50a7383f3e9df29573.`,
				category: "Reverse Engineering",
				points: 275,
				flag: "flag{m1x3d_but_n0t_m1x3d_up}",
				solved_by: ["aaditya_purani", "mevz"],
			},
		],
		web: [
			{
				id: undefined,
				name: "GPUSHOP2",
				description: `Hey kid, wanna buy some gpus again?`,
				category: "Web Exploitation",
				points: 394,
				flag: "flag{gpus_4r3_4w350m3}",
				solved_by: ["mevz", "szymex73"],
			},
			{
				id: undefined,
				name: "HORKOS",
				description: `Eat your vegetables.`,
				category: "Web Exploitation",
				points: 363,
				flag: "flag{h0rk0s_w4nt5_y0ur_v3g3tabl3s}",
				solved_by: ["aaditya_purani", "d1sconn3ct3d"],
			},
			{
				id: undefined,
				name: "LOG4J",
				description: `Talk with the most advanced AI.`,
				category: "Web Exploitation",
				points: 119,
				flag: "flag{1_4m_4w350m3}",
				solved_by: [
					"aaditya_purani",
					"TheVamp",
					"TheFakeMusketeer",
					"szymex73",
				],
			},
		],
	},
};

module.exports = {
	categories,
	teams,
	googleCTF,
};
