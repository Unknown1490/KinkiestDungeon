"use strict";

/**
 * @type {KDTeaseAttackListsType}
 */
let KDTeaseAttackLists = {
	Basic: [
		"SquishBreast",
		"LeashGrab",
		"SpankButt",
		"TickleArmpits",
		"TickleFeet",
		"Headpat",
		"ShoulderMassage",
		"Praise",
		"SqueezeButt",
		"VibeToy",
		"InsertToy",
		"AddStuffing",
		/*,
		"AddCarabiner",*/
	],
};

/**
 * @type {KDTeaseAttacksType}
 */
let KDTeaseAttacks = {
	Praise: {
		name: "Praise",
		priority: 1,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& KDEnemyCanTalk(enemy)
				&& (
					KinkyDungeonGoddessRep.Ghost + 50 > 10
				)
				&& !KDIsDisarmed(enemy);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*(0.5 + 1.5 * (KinkyDungeonGoddessRep.Ghost + 50)/100), type: "soul"});
			let index = Math.floor(Math.random() * 3);
			let suff = (KDGetEnemyPlayLine(enemy) ? KDGetEnemyPlayLine(enemy) : "");
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/DamageWeak.ogg");
			KinkyDungeonSendDialogue(enemy, TextGet("KinkyDungeonRemindJailPlay" + suff + index)
				.replace("EnemyName", TextGet("Name" + enemy.Enemy.name)), KDGetColor(enemy), 2, 3);

			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_Praise")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_Praise")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	SquishBreast: {
		name: "SquishBreast",
		priority: 1,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& !KDPlayerFacingAway(player, enemy)
				&& (
					KinkyDungeonFlags.get("armattack")
					|| KinkyDungeonFlags.get("armspell")
				)
				&& !KDIsDisarmed(enemy);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*1, type: "grope"});
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Grope.ogg");
			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_SquishBreast")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_SquishBreast")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	SpankButt: {
		name: "SpankButt",
		priority: 2,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& (
					KinkyDungeonFlags.get("legspell")
					|| KDPlayerFacingAway(player, enemy)
				)
				&& !KDIsDisarmed(enemy);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*1.5, type: "grope"});
			KinkyDungeonChangeDistraction(1, false, 0.25);
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Slap.ogg");
			KDChangeBalance((KDBaseBalanceDmgLevel + KDGameData.HeelPower) / KDBaseBalanceDmgLevel * 0.5*-KDBalanceDmgMult() * 1.5/KinkyDungeonStatWillMax, true);
			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_SpankButt")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_SpankButt")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	VibeToy: {
		name: "VibeToy",
		priority: 1.25,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& !KDPlayerFacingAway(player, enemy)
				&& !KDIsDisarmed(enemy)
				&& (
					KDGetVibeToys(enemy).length > 0
					&& 1*KinkyDungeonChastityMult() < 1.5
				);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*(1.5 - 1*KinkyDungeonChastityMult()), type: "charm"});
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Vibe.ogg");
			let toys = KDGetVibeToys(enemy);
			let toy = (toys.length > 0) ? toys[Math.floor(KDRandom() * toys.length)] : "";
			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_VibeToy")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string)
						.replace("VTY", TextGet("Restraint"+toy)),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_VibeToy")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("VTY", TextGet("Restraint"+toy))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	InsertToy: {
		name: "InsertToy",
		priority: 3,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& !KDIsDisarmed(enemy)
				&& (
					KDGetVibeToys(enemy).length > 0
					&& KDGetVibeToys(enemy).some((toy) => {
						return KDCanAddRestraint(KDRestraint({name: toy}), false, "", true, undefined, false, true) != undefined;
					})
					&& (KDPlayerIsStunned() != false || (KDPlayerFacingAway(player, enemy) && !KinkyDungeonCanStand()))
				);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*1, type: "pierce"});
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Grope.ogg");
			let toys = KDGetVibeToys(enemy).filter((toy) => {
				return KDCanAddRestraint(KDRestraint({name: toy}), false, "", true, undefined, false, true);
			});
			let selected = (toys.length > 0) ? toys[Math.floor(KDRandom() * toys.length)] : "";
			if (dmg.happened && KinkyDungeonAddRestraintIfWeaker(selected, 0, false, "", true)) {
				enemy.items.splice(enemy.items.indexOf(selected), 1);
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_InsertToy")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string)
						.replace("VTY", TextGet("Restraint"+selected)),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_InsertToy")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("VTY", TextGet("Restraint"+selected))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	AddStuffing: {
		name: "AddStuffing",
		priority: 3,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& !KDIsDisarmed(enemy)
				&& (
					!KDPlayerFacingAway(player, enemy)
					&& KinkyDungeonFlags.get("verbalspell")
					&& KDCanAddRestraint(KDRestraint({name: "Stuffing"}), false, "", true, undefined, false, true)
				);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*1, type: "chain"});
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Struggle.ogg");
			let selected = "Stuffing";
			if (dmg.happened && KinkyDungeonAddRestraintIfWeaker(selected, 0, false, "", true)) {

				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_AddStuffing")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string)
						.replace("VTY", TextGet("Restraint"+selected)),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_AddStuffing")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("VTY", TextGet("Restraint"+selected))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	SqueezeButt: {
		name: "SqueezeButt",
		priority: 1,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& (
					KinkyDungeonFlags.get("legspell")
					|| KDPlayerFacingAway(player, enemy)
				)
				&& !KDIsDisarmed(enemy);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*0.5, type: "grope"});
			KinkyDungeonChangeDistraction(1, false, 0.25);
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Grope.ogg");
			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_SqueezeButt" + (KinkyDungeonLastAction == "Move" ? "Move" : ""))
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_SqueezeButt")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	ShoulderMassage: {
		name: "ShoulderMassage",
		priority: 1,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& (
					KDPlayerFacingAway(player, enemy)
					&& KDistEuclidean(player.x - enemy.x, player.y - enemy.y) < 1.1 // Only adjacent
				)
				&& !KDIsDisarmed(enemy);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*2, type: "plush"});
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Grope.ogg");
			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_ShoulderMassage")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_ShoulderMassage")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	Headpat: {
		name: "Headpat",
		priority: 2,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& (
					!KinkyDungeonCanStand()
					|| KinkyDungeonFlags.get("miscast")
				)
				&& !KDIsDisarmed(enemy);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*(2 - 1.9*(KinkyDungeonGoddessRep.Ghost + 50)/100), type: "plush"});
			if ((KinkyDungeonGoddessRep.Ghost + 50)/100 > 0)
				KinkyDungeonChangeDistraction((KinkyDungeonGoddessRep.Ghost + 50)/100 * 2, false, 0.5);
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Grope.ogg");
			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_SpankButt" + (KinkyDungeonLastAction == "Move" ? "Move" : ""))
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_SpankButt")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	TickleArmpits: {
		name: "TickleArmpits",
		priority: 1,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& (
					KinkyDungeonFlags.get("armspell")
					|| KinkyDungeonFlags.get("armattack")
				)
				&& !KDIsDisarmed(enemy);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*1, type: "tickle"});
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Tickle.ogg");
			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_TickleArmpits")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_TickleArmpits")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	TickleFeet: {
		name: "TickleFeet",
		priority: 2,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			return KDBasicTeaseAttack(enemy, player)
				&& (
					KinkyDungeonFlags.get("legspell")
					|| (KinkyDungeonLastAction == "Move" && KDPlayerFacingAway(player, enemy))
				)
				&& !KinkyDungeonPlayerTags.get("BootsArmor")
				&& !KinkyDungeonPlayerTags.get("Boots")
				&& !KDIsDisarmed(enemy);
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			let strip = false;
			if (player.player) {
				let CurrentDress = KinkyDungeonCurrentDress;
				let DressList = KDGetDressList()[CurrentDress];
				for (let clothes of DressList) {
					if (!clothes.Lost && (clothes.Group == "Shoes" || (
						StandalonePatched && ModelDefs[clothes.Item]?.Categories?.includes("Shoes")
					))) {
						clothes.Lost = true;
						strip = true;
					}
				}
			}
			let dmg = (blocked || evaded) ? {dmg: "", happened: 0} :  KinkyDungeonDealDamage({damage: damagemod*2, type: "tickle"});
			KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Tickle.ogg");
			if (dmg.happened) {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttack_TickleFeet" + ((strip) ? "Remove" : ""))
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						.replace("DMGDLT", dmg.string),
					"#ff9999", 1);
			} else {
				KinkyDungeonSendTextMessage(4,
					TextGet("KDTeaseAttackResist_TickleFeet")
						.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
						+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
					"#ff9999", 1);
			}

			return true;
		},
	},
	LeashGrab: {
		name: "LeashGrab",
		priority: 6,
		blockable: true, dodgeable: true,
		filter: (enemy, player, AIData) => {
			if (KDBasicTeaseAttack(enemy, player)
				&& (
					AIData.attack.includes("Bind")
					&& enemy.Enemy.bound
					&& KDGameData.MovePoints > -1
					&& KinkyDungeonTorsoGrabCD < 1
					&& (KinkyDungeonLastAction == "Move" || KinkyDungeonLastAction == "Cast")
				)
				&& !KDIsDisarmed(enemy)) {
				let caught = false;
				for (let tile of enemy.warningTiles) {
					if (enemy.x + tile.x == player.x && enemy.y + tile.y == player.y) {
						caught = true;
						break;
					}
				}
				if (caught) {
					let list = KinkyDungeonAllRestraintDynamic();
					for (let restraint of list) {
						if (KDRestraint(restraint.item) && KDRestraint(restraint.item).harness) {
							return true;
						}
					}
				}
			}

			return false;
		},
		apply: (enemy, player, AIData, blocked, evaded, damagemod) => {
			if (!blocked && !evaded) {
				// Easier to evase harness grabs
				let harnessChance = 0;
				let harnessRestraintName = "";
				let list = KinkyDungeonAllRestraintDynamic();
				let list2 = [];
				for (let restraint of list) {
					if (KDRestraint(restraint.item) && KDRestraint(restraint.item).harness) {
						harnessChance += 1;
						list2.push(restraint.item.name);
					}
				}
				let rest = list2[Math.floor(KDRandom() * list2.length)];
				if (rest) harnessRestraintName = rest;

				if (harnessChance > 0) {
					let roll = KDRandom();
					let bonus = 0;
					if (KDForcedToGround() || !KinkyDungeonCanStand()) bonus += KinkyDungeonTorsoGrabChanceBonus;
					if (KinkyDungeonStatWill < 0.01) bonus += KinkyDungeonTorsoGrabChanceBonus*2;
					for (let T = 0; T < harnessChance; T++) {
						roll = Math.min(roll, KDRandom());
					}
					if (roll < KinkyDungeonTorsoGrabChance + bonus) {
						KDGameData.MovePoints = Math.min(-1, KDGameData.MovePoints);
						let msg = TextGet("KinkyDungeonTorsoGrab").replace("RestraintName", KDGetItemNameString(harnessRestraintName)).replace("EnemyName", TextGet("Name" + enemy.Enemy.name));

						KinkyDungeonSendTextMessage(5, msg, "#ff8800", 1);

						if (KDRandom() < actionDialogueChance)
							KinkyDungeonSendDialogue(enemy, TextGet("KinkyDungeonRemindJail" + (KDGetEnemyPlayLine(enemy) ? KDGetEnemyPlayLine(enemy) : "") + "Grab").replace("EnemyName", TextGet("Name" + enemy.Enemy.name)), KDGetColor(enemy), 2, 4);

						KinkyDungeonPlaySound(KinkyDungeonRootDirectory + "Audio/Grab.ogg", enemy);
						KinkyDungeonTorsoGrabCD = 3;
						KinkyDungeonSetFlag("grabbed", 3);
						return true;
					}
				}
			}
			KinkyDungeonSendTextMessage(4,
				TextGet("KDTeaseAttackResist_LeashGrab")
					.replace("ENMY", TextGet("Name" + enemy.Enemy.name))
				+ TextGet("ResistType" + (blocked ? "Block" : (evaded ? "Dodge" : ""))),
				"#ff9999", 1);
			return false;
		}
	}
};