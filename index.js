require("./smsg")
const useCODE = process.argv.includes("-code")
const useQR = !useCODE
const { default: makeWASocket, PHONENUMBER_MCC, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto } = require("@ferdiz-afk/baileys")
const fs = require("fs")
const pino = require("pino")
const chalk = require("chalk")
const path = require("path")
const axios = require("axios")
const FileType = require("file-type")
const readline = require("readline")
const NodeCache = require("node-cache")
const { Boom } = require("@hapi/boom")
const PhoneNumber = require("awesome-phonenumber")
const { parsePhoneNumber } = require("libphonenumber-js")
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./lib/exif")
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

async function connectToWhatsApp() {
const { state, saveCreds } = await useMultiFileAuthState("./session")
const nodeCache = new NodeCache()
const akira = makeWASocket({
	"browser": ["Chrome (Linux)", "", ""],
	"logger": pino({ "level": "fatal" }),
	"auth": state,
	"printQRInTerminal": useQR && !useCODE,
	"generateHighQualityLinkPreview": true,
	"msgRetryCounterCache": nodeCache,
	"markOnlineOnConnect": true,
	"defaultQueryTimeoutMs": undefined
})

if (useCODE && !akira.user && !akira.authState.creds.registered) {
async function StartYtta() {
const rl = readline.createInterface({
"input": process.stdin,
"output": process.stdout
})
const meong = quest1 => new Promise(quest2 => rl.question(quest1, quest2))
const numbSetan = await meong("\nPlease type your WhatsApp number : ")
numbSetanb = numbSetan.replace(/[^0-9]/g, '')
numSetan = parsePhoneNumber("+" + numbSetanb)
if (!numSetan.isValid()) {
console.log(chalk.bgBlack(chalk.redBright("Start With your country's WhatsApp code, Example : 628xxx")))
rl.close()
return StartYtta()
}
const phoneNumber = PHONENUMBER_MCC[numSetan.countryCallingCode]
if (!phoneNumber) {
console.log(chalk.bgBlack(chalk.redBright("Start With your country's WhatsApp code, Example : 628xxx")))
rl.close()
return StartYtta()
}
const codePairing = await akira.requestPairingCode(numbSetanb)
code = codePairing?.match(/.{1,4}/g)?.join("-") || codePairing
console.log(chalk.bgBlack(chalk.bgGreen("Your pairing code : ")), chalk.black(chalk.bgWhite(code)))
rl.close()
}
await StartYtta()
}

akira.ev.on("connection.update", ({ connection }) => {
if (connection == "open") {
console.log("KONEKSI " + "Terhubung (" + akira.user?.["id"]["split"](":")[0] + ")")
}
if (connection === "close") {
connectToWhatsApp()
}
if (connection === "connecting") {
if (akira.user) {
console.log("KONEKSI " + "Menghubungkan Ulang (" + akira.user?.["id"]["split"](":")[0] + ")")
} else if (!useQR && !useCODE) {
console.log("CONNECTION " + "Autentikasi Dibutuhkan\nGunakan Perintah \x1B[36mnpm start\x1B[0m untuk terhubung menggunakan nomor telepon\n\n\x1B[1m\x1B[41m Full Tutorial Check di Youtube: @KirBotz \x1B[0m\n\n")
}
}
})

akira.ev.process(async (events) => {
	if (events['messages.upsert']) {
		const upsert = events['messages.upsert']
		for (let msg of upsert.messages) {
			if (!msg.message) {
				return
			}
			if (msg.key.remoteJid === 'status@broadcast') {
				if (msg.message?.protocolMessage) return
				console.log(`Lihat Status ${msg.pushName} ${msg.key.participant.split('@')[0]}`)
				await akira.readMessages([msg.key])
				await delay(1000)
				return await akira.readMessages([msg.key])
			}
			const mek = smsg(akira, msg)
			require("./akira.js")(akira, mek, store)
		}
	}
})

akira.decodeJid = (jid) => {
	if (!jid) return jid
	if (/:\d+@/gi.test(jid)) {
		let decode = jidDecode(jid) || {}
		return decode.user && decode.server && decode.user + '@' + decode.server || jid
	} else return jid
}

akira.ev.on('contacts.update', update => {
	for (let contact of update) {
		let id = akira.decodeJid(contact.id)
		if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
	}
})

akira.getName = (jid, withoutContact = false) => {
	id = akira.decodeJid(jid)
	withoutContact = akira.withoutContact || withoutContact 
	let v
	if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
		v = store.contacts[id] || {}
		if (!(v.name || v.subject)) v = akira.groupMetadata(id) || {}
		resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
	})
	else v = id === '0@s.whatsapp.net' ? {
		id,
		name: 'WhatsApp'
	} : id === akira.decodeJid(akira.user.id) ?
	akira.user :
	(store.contacts[id] || {})
	return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

akira.public = false
akira.ev.on('creds.update', saveCreds)

akira.downloadMediaMessage = async (message) => {
	let mime = (message.msg || message).mimetype || ''
	let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
	const stream = await downloadContentFromMessage(message, messageType)
	let buffer = Buffer.from([])
	for await(const chunk of stream) {
		buffer = Buffer.concat([buffer, chunk])
	}
	return buffer
}

akira.downloadM = async (m, type, filename = '') => {
	if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
	const stream = await downloadContentFromMessage(m, type)
	let buffer = Buffer.from([])
	for await (const chunk of stream) {
		buffer = Buffer.concat([buffer, chunk])
	}
	if (filename) await fs.promises.writeFile(filename, buffer)
	return filename && fs.existsSync(filename) ? filename : buffer
}

akira.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

akira.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await akira.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

akira.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await akira.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

return akira

}

connectToWhatsApp()