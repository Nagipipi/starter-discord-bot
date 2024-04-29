
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 


const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');


const app = express();
// app.use(bodyParser.json());

const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
	"Access-Control-Allow-Headers": "Authorization",
	"Authorization": `Bot ${TOKEN}`
  }
});




app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    console.log(interaction.data.name)
    if(interaction.data.name == 'survivor'){
      const survivors = ['医師','弁護士','泥棒','庭師','マジシャン','冒険家','傭兵','空軍','祭司','機械技師','オフェンス','心眼','調香師','カウボーイ','踊り子','占い師','納棺師','探鉱者','呪術師','野人','曲芸師','一等航海士','バーメイド','ポストマン','墓守','｢囚人｣','昆虫学者','画家','バッツマン','玩具職人','患者','｢心理学者｣','小説家','｢少女｣','泣きピエロ','教授','骨董商','作曲家','記者','航空エンジニア','応援団','人形師','幸運児']
      const randomIndex = Math.floor(Math.random() * survivors.length);
      const survivorresult = survivors[randomIndex];
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${survivorresult}`,
        },
      });
    }

    if(interaction.data.name == 'hunter'){
      const hunters = ['復讐者','道化師','断罪狩人','リッパー','結魂者','芸者','白黒無常','写真家','狂眼','黄衣の王','夢の魔女','泣き虫','魔トカゲ','血の女王','ガードNo.26','｢使徒｣','ヴァイオリニスト','彫刻師','｢アンデッド｣','破輪','漁師','蝋人形師','｢悪夢｣','書記官','隠者','夜の番人','オペラ歌手','｢フールズ・ゴールド｣','時空の影']
      const randomIndex = Math.floor(Math.random() * hunters.length);
      const hunterresult = hunters[randomIndex];
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${hunterresult}`,
        },
      });
    }

    if(interaction.data.name == 'skill'){
      const skills = ['リッスン','巡視者','監視者','瞬間移動','神出鬼没','異常','興奮','移形']
      const randomIndex = Math.floor(Math.random() * skills.length);
      const skillresult = skills[randomIndex];
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${skillresult}`,
        },
      });
    }

/*
    if(interaction.data.name == 'dm'){
      // https://discord.com/developers/docs/resources/user#create-dm
      let c = (await discord_api.post(`/users/@me/channels`,{
        recipient_id: interaction.member.user.id
      })).data
      try{
        // https://discord.com/developers/docs/resources/channel#create-message
        let res = await discord_api.post(`/channels/${c.id}/messages`,{
          content:'Yo! I got your slash command. I am not able to respond to DMs just slash commands.',
        })
        console.log(res.data)
      }catch(e){
        console.log(e)
      }

      return res.send({
        // https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data:{
          content:'👍'
        }
      });
    }
*/
	  
  }

});



app.get('/register_commands', async (req,res) =>{
  let slash_commands = [
    {
      "name": "survivor",
      "description": "サバイバーをランダムで1人選びます",
      "options": []
    },
    {
      "name": "hunter",
      "description": "ハンターをランダムで1人選びます",
      "options": []
    }
/*
    {
      "name": "skill",
      "description": "補助特質をランダムで1つ選びます",
      "options": []
    }
*/
  ]
  try
  {
    // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
    let discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
      slash_commands
    )
    console.log(discord_response.data)
    return res.send('commands have been registered')
  }catch(e){
    console.error(e.code)
    console.error(e.response?.data)
    return res.send(`${e.code} error from discord`)
  }
})


app.get('/', async (req,res) =>{
  return res.send('Follow documentation ')
})


app.listen(8999, () => {

})

