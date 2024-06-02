const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@ferdiz-afk/baileys")
const { exec } = require("child_process")
const axios = require("axios")
const cheerio = require("cheerio")
const util = require("util")
const fs = require("fs")
const Jimp = require("jimp")
const fetch = require("node-fetch")
const chalk = require("chalk")

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

module.exports = akira = async (akira, mek, store) => {
try {
const qrisall = await fs.readFileSync("./image/qris.png")
const owner = JSON.parse(fs.readFileSync("./database/owner.json"))
const { type, quotedMsg, mentioned, now, fromMe } = mek
const body = (mek.mtype === 'conversation') ? mek.message.conversation : (mek.mtype == 'imageMessage') ? mek.message.imageMessage.caption : (mek.mtype == 'videoMessage') ? mek.message.videoMessage.caption : (mek.mtype == 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (mek.mtype == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : (mek.mtype == 'listResponseMessage') ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (mek.mtype == 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId : (mek.mtype == 'interactiveResponseMessage') ? JSON.parse(mek.msg.nativeFlowResponseMessage.paramsJson).id : (mek.mtype == 'templateButtonReplyMessage') ? mek.msg.selectedId : (mek.mtype === 'messageContextInfo') ? (mek.message.buttonsResponseMessage?.selectedButtonId || mek.message.listResponseMessage?.singleSelectReply.selectedRowId || mek.text) : ''
const prefix = /^[.#!/^]/.test(body) ? body.match(/^[.#!/^]/gi) : '#'
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const from = mek.key.remoteJid
const botNumber = await akira.decodeJid(akira.user.id)
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(mek.sender)
const isGroup = from.endsWith('@g.us')
const sender = isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid
const groupMetadata = isGroup? await akira.groupMetadata(mek.chat).catch(e => {}) : ""
const pwkdnwn = isGroup? await groupMetadata.participants : ""
const groupAdmins = isGroup? await pwkdnwn.filter(v => v.admin !== null).map(v => v.id) : ""
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const pushname = mek.pushName || "No Name"
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const quoted = mek.quoted ? mek.quoted : mek
const mime = (quoted.msg || quoted).mimetype || ''

var mdu = ['red','green','yellow','blue','magenta','cyan','white']
var halalu = mdu[Math.floor(Math.random() * mdu.length)]
var mdo = ['red','green','yellow','blue','magenta','cyan','white']
var halalo = mdo[Math.floor(Math.random() * mdo.length)]
var mdi = ['red','green','yellow','blue','magenta','cyan','white']
var halali = mdi[Math.floor(Math.random() * mdi.length)]
var mda = ['red','green','yellow','blue','magenta','cyan','white']
var halala = mda[Math.floor(Math.random() * mda.length)]
var mde = ['red','green','yellow','blue','magenta','cyan','white']
var halale = mde[Math.floor(Math.random() * mde.length)]

if (isCmd) {
console.log(chalk.yellow.bgCyan.bold(' AKIRA '), color(`[ PESAN ]`, `${halalu}`), color(`FROM`, `${halalo}`), color(`${pushname}`, `${halali}`), color(`Text :`, `${halala}`), color(`${body}`, `${halale}`))
}

const reply = (text) => {
akira.sendMessage(from, { text: text, contextInfo: { mentionedJid: [sender], forwardingScore: 9999999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363196790225702@newsletter', newsletterName: 'Saluran WhatsApp KirBotz', serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: owner + "@s.whatsapp.net" }, } }, { quoted: mek })
}

switch (command) {
case "menu": {
const textnya = `Hallo Kak @${sender.split("@")[0]}

╭─▸ *\`List Menu\`*
│⭔${prefix}add \`[ 628******** ]\`
│⭔${prefix}kick \`[ 628******** ]\`
│⭔${prefix}hidetag \`[ pesan text tag ]\`
│⭔${prefix}openai \`[ chat ai bot ]\`
│⭔${prefix}tourl \`[ image to url ]\`
│⭔${prefix}toimg \`[ reply sticker ]\`
│⭔${prefix}sticker \`[ reply foto/video ]\`
│⭔${prefix}qc \`[ buat sticker text WA ]\`
│⭔${prefix}tiktok \`[ unduh video tiktok ]\`
│⭔${prefix}hd \`[ foto burik -> hight quality ]\`
╰────────────˧

\`\`\`Note: Semua Fitur Gratis Jangan Lupa Donasi Ya Kak Ketik .donasi\`\`\``
akira.sendMessage(from, { text: textnya, contextInfo: { mentionedJid: [sender], forwardingScore: 9999999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363196790225702@newsletter', newsletterName: 'Saluran WhatsApp KirBotz', serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: owner + "@s.whatsapp.net" }, } }, { quoted: mek })
}
break
case "s": case "stiker": case "sticker": {
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await akira.sendImageAsSticker(from, media, mek, { packname: "", author: `×͜× ▭▬▭▬▭▬ 👑 ▭▬▭▬▭▬ ×͜×\nﾒ 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗕𝘆 𝗞𝗮𝘆𝗹𝗮\nﾒ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 𝗞𝗮𝘆𝗹𝗮 : 𝟬𝟴𝟳𝟳𝟬𝟱𝟬𝟰𝟴𝟮𝟯𝟱\nﾒ 𝗬𝗼𝘂𝘁𝘂𝗯𝗲 : 𝗞𝗶𝗿𝗕𝗼𝘁𝘇\n⊟————————⊟` })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply(`Reply Gambar/Video Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
let media = await quoted.download()
let encmedia = await akira.sendVideoAsSticker(from, media, mek, { packname: "", author: `×͜× ▭▬▭▬▭▬ 👑 ▭▬▭▬▭▬ ×͜×\nﾒ 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗕𝘆 𝗞𝗮𝘆𝗹𝗮\nﾒ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 𝗞𝗮𝘆𝗹𝗮 : 𝟬𝟴𝟳𝟳𝟬𝟱𝟬𝟰𝟴𝟮𝟯𝟱\nﾒ 𝗬𝗼𝘂𝘁𝘂𝗯𝗲 : 𝗞𝗶𝗿𝗕𝗼𝘁𝘇\n⊟————————⊟` })
await fs.unlinkSync(encmedia)
} else {
reply(`Reply Gambar/Video Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
}
}
break
case "toimg": {
if (!quoted) return reply(`Balas sticker dengan caption *${prefix+command}*`)
if (!/webp/.test(mime)) return reply(`Balas sticker dengan caption *${prefix+command}*`)
let media = await akira.downloadAndSaveMediaMessage(quoted)
let ran = `${Math.floor(Math.random() * 100000)}.png`
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return akira.sendMessage(from, { text: util.format(err) }, { quoted: mek })
let buffer = fs.readFileSync(ran)
akira.sendMessage(from, { image: buffer }, { quoted: mek })
fs.unlinkSync(ran)
})
}
break
case "qc": {
if (!q) return reply(`Command ${prefix+command} text`)
try {
var linkppuserp = await akira.profilePictureUrl(mek.sender, 'image')
} catch {
var linkppuserp = 'https://telegra.ph/file/e323980848471ce8e2150.png'
}
const json = { 
"type": "quote", 
"format": "png", 
"backgroundColor": 
"#C0C0C0", 
"width": 512, 
"height": 768, 
"scale": 2, 
"messages": [{ 
"entities": [], 
"avatar": true, 
"from": { 
"id": 1, 
"name": mek.pushName, 
"photo": { 
"url": linkppuserp 
}
}, 
"text": q, 
"replyMessage": {}
}]
}
const response = axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
var opt = { packname: "", author: `×͜× ▭▬▭▬▭▬ 👑 ▭▬▭▬▭▬ ×͜×\nﾒ 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗕𝘆 𝗞𝗮𝘆𝗹𝗮\nﾒ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 𝗞𝗮𝘆𝗹𝗮 : 𝟬𝟴𝟳𝟳𝟬𝟱𝟬𝟰𝟴𝟮𝟯𝟱\nﾒ 𝗬𝗼𝘂𝘁𝘂𝗯𝗲 : 𝗞𝗶𝗿𝗕𝗼𝘁𝘇\n⊟————————⊟` }
akira.sendImageAsSticker(from, buffer, mek, opt)
})
}
break
case "donasi": {
const txtdon = `Donasi Ke Qris Aja Ya Kakak`
akira.sendMessage(from, { image: qrisall, caption: txtdon, contextInfo:{ forwardingScore: 5, isForwarded: true } }, { quoted: mek })
}
break
case "tiktok": {
if (!q) return reply(`Penggunaan Salah Contoh .${command} https://vm.tiktok.com/ZSLdF9NYN`)
let res = await tikVideo(q)
let ghd = await akira.sendMessage(from, {video:{url: res.hdplay},caption: `*Sukses Kak Tunggu Aja Audio Nya Di Bawah Yaa*\n> Jika Tidak Bisa Di Putar Download Video Di Sini ${res.play}`},{quoted:mek})
akira.sendMessage(from, {audio:{url: res.music}, mimetype: "audio/mp4", ptt:false},{quoted:ghd})
}
break
case "hidetag": {
if (!isGroup) return reply("Khusus Dalam Group")
if (!isAdmins && !isCreator) return reply("Khusus Admin Group")
if (!isBotAdmins) return reply("Jadikan Bot Sebagai Admin Terlebih Dahulu Jika Ingin Menggunakan Fitur Ini")
if (!text) return reply("Teks Nya Mana Kak?")
global.texthidetag = text
akira.sendMessage(from, { text : global.texthidetag , mentions: pwkdnwn.map(a => a.id)}, { quoted: mek })
}
break
case "kick": {
if (!isGroup) return reply("Khusus Dalam Group")
if (!isAdmins && !isOwner) return reply("Khusus Admin Group")
if (!isBotAdmins) return reply("Jadikan Bot Sebagai Admin Terlebih Dahulu Jika Ingin Menggunakan Fitur Ini")
const users = mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
akira.groupParticipantsUpdate(from, [users], 'remove').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "add": {
if (!isGroup) return reply("Khusus Dalam Group")
if (!isAdmins && !isOwner) return reply("Khusus Admin Group")
if (!isBotAdmins) return reply("Jadikan Bot Sebagai Admin Terlebih Dahulu Jika Ingin Menggunakan Fitur Ini")
const users = mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
akira.groupParticipantsUpdate(from, [users], 'add').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "openai": {
if (!q) return reply(`Pertanyaan Nya Apa Bang?`)
let gpt4 = await fetchJson("https://aemt.me/gpt4?text=" + q)
reply(util.format(gpt4.result))
}
break
case "tourl": {
try {
let mee = await akira.downloadAndSaveMediaMessage(quoted)
let mem = await uptotelegra(mee)
reply(util.format(mem))
} catch (err) {
reply(`Reply Image Nya Bang`)
}
}
break
case "hd": {
if (!/image/.test(mime)) return reply("Reply Foto Nya Dengan Teks " + prefix + command)
const media = await quoted.download()
const proses = await remini(media, "enhance")
akira.sendMessage(from, { image: proses, caption: "Sukses Kak" }, { quoted: mek })
}
break
default:
}
} catch (e) {
console.log(util.format(e))
}
}

const file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update File ${__filename}`))
delete require.cache[file]
require(file)
})