const { proto, getContentType } = require("@ferdiz-afk/baileys")
const axios = require("axios")

global.smsg = (akira, msg) => {
let M = proto.WebMessageInfo
msg = M.fromObject(msg)
if (msg.key) {
msg.id = msg.key.id
msg.isBaileys = msg.id && msg.id.length === 16 || msg.id.startsWith('3EB0') && msg.id.length === 12 || false
msg.chat = akira.decodeJid(msg.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
msg.now = msg.messageTimestamp
msg.isGroup = msg.chat.endsWith('@g.us')
msg.sender = akira.decodeJid(msg.key.fromMe && akira.user.id || msg.participant || msg.key.participant || msg.chat || '')
}
if (msg.message) {
let mtype = Object.keys(msg.message)
msg.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || 
(mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || 
mtype[mtype.length - 1]
msg.type = getContentType(msg.message)
msg.msg = (msg.mtype == 'viewOnceMessage' ? msg.message[msg.mtype].message[getContentType(msg.message[msg.mtype].message)] : msg.message[msg.type])
if (msg.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(msg.mtype)) msg.chat = (msg.key.remoteJid !== 'status@broadcast' && msg.key.remoteJid) || msg.sender
if (msg.mtype == 'protocolMessage' && msg.msg.key) {
if (msg.msg.key.remoteJid == 'status@broadcast') msg.msg.key.remoteJid = msg.chat
if (!msg.msg.key.participant || msg.msg.key.participant == 'status_me') msg.msg.key.participant = msg.sender
msg.msg.key.fromMe = akira.decodeJid(msg.msg.key.participant) === akira.decodeJid(akira.user.id)
if (!msg.msg.key.fromMe && msg.msg.key.remoteJid === akira.decodeJid(akira.user.id)) msg.msg.key.remoteJid = msg.sender
}
msg.text = msg.msg || ''
msg.mentionedJid = msg.msg?.contextInfo?.mentionedJid?.length && msg.msg.contextInfo.mentionedJid || []
let quoted = msg.quoted = msg.msg?.contextInfo?.quotedMessage ? msg.msg.contextInfo.quotedMessage : null
if (msg.quoted) {
let type = Object.keys(msg.quoted)[0]
msg.quoted = msg.quoted[type]
if (typeof msg.quoted === 'string') msg.quoted = { text: msg.quoted }
msg.quoted.mtype = type
msg.quoted.id = msg.msg.contextInfo.stanzaId
msg.quoted.chat = akira.decodeJid(msg.msg.contextInfo.remoteJid || msg.chat || msg.sender)
msg.quoted.isBaileys = msg.quoted.id && msg.quoted.id.length === 16 || false
msg.quoted.sender = akira.decodeJid(msg.msg.contextInfo.participant)
msg.quoted.text = msg.quoted.text || msg.quoted.caption || msg.quoted.contentText || ''
msg.quoted.mentionedJid = msg.quoted.contextInfo?.mentionedJid?.length && msg.quoted.contextInfo.mentionedJid || []
let vM = msg.quoted.fakeObj = M.fromObject({
key: {
fromMe: msg.quoted.fromMe,
remoteJid: msg.quoted.chat,
id: msg.quoted.id
},
message: quoted,
...(msg.isGroup ? { participant: msg.quoted.sender } : {})
})
msg.getQuotedObj = msg.getQuotedMessage = async () => {
if (!msg.quoted.id) return null
let q = M.fromObject(vM)
return smsg(akira, q)
}
if (msg.quoted.url || msg.quoted.directPath) msg.quoted.download = () => akira.downloadMediaMessage(msg.quoted)
msg.quoted.copy = () => smsg(akira, M.fromObject(M.toObject(vM)))
}
}
if (msg.msg && msg.msg.url) msg.download = (saveToFile = false) => akira.downloadM(msg.msg, msg.mtype.replace(/message/i, ''), saveToFile)
return msg
}

const domain = "https://www.tikwm.com/";

const tikVideo = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isUrl = (str) => /^https?:\/\//.test(str);
      if (!isUrl(url) || !/tiktok\.com/i.test(url))
        throw new Error("Invalid URL: " + url);
      const res = await axios.post(
        domain + "/api/",
        {},
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua":
              '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
          },
          params: {
            url: url,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1,
          },
        },
      );

      if (res?.data?.code === -1) {
        resolve(res?.data);
      } else {
        resolve({
          status: 200,
          ...updateUrls(res.data?.data),
        });
      }
    } catch (error) {
      resolve({
        status: 404,
        msg: error?.message,
      });
    }
  });
};

const tikUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        domain + "/api/user/posts",
        {},
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua":
              '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
          },
          params: {
            unique_id: user,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1,
          },
        },
      );

      const videos = res.data?.data?.videos;
      if (!videos || videos.length < 1) {
        resolve({
          error: true,
          message: "The user has not uploaded any videos",
          log: res.data,
        });
      }

      const lastVideo = videos.sort((a, b) => b.create_time - a.create_time)[0];

      resolve({
        status: 200,
        data: {
          videos: videos.map((x) => updateUrls(x)),
          lastVideo: updateUrls(lastVideo),
        },
      });
    } catch (error) {
      resolve({
        status: 404,
        msg: error?.message,
      });
    }
  });
};

function updateUrls(obj) {
  const regex =
    /("avatar": "|music": "|play": "|wmplay": "|hdplay": "|cover": ")(\/[^"]+)/g;
  const updatedData = JSON.stringify(obj, null, 2).replace(
    regex,
    (match, p1, p2) => p1 + domain + p2,
  );
  return JSON.parse(updatedData);
}

global.tikVideo = tikVideo