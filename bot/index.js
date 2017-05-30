//import packages
import Discord from 'discord.js';

//import files
import options from './options';
import tier from './tier'

//Create a instance of the discord client
const client = new Discord.Client();


//Handle the message
client.on('message', msg => {
  //Parse the message to an array (each index are 1 word)
  let msgArray = msg.content.split(' ');

  //Handle the "!tier" command
  if(msgArray[0].toLowerCase() === '!tier'){
    (async function(){
      msgArray.splice(0, 1);
      let msgString = msgArray.join(' ');


      const playerData = await tier.getIdTier(msgString);
      if(playerData.idResponseStatus === 200){
        const titleString = await tier.getTitleString('RANKED_SOLO_5x5');
        const nameString = msgString;
        const valueString = await tier.getValueString(playerData.tier, 'RANKED_SOLO_5x5');
        const imgString = await tier.getImgString(playerData.tier, 'RANKED_SOLO_5x5');
        const playerIconImgString = await tier.getIconImgString(playerData.id.profileIconId);
        const embed = await tier.getEmbed(titleString, nameString, valueString, imgString, playerIconImgString);

        msg.channel.send({ embed });
      } else {
        msg.reply(`This player doesn't exist.`);
      }
    }())
  }

  if(msgArray[0].toLowerCase() === '!tierflex'){
    (async function(){
      msgArray.splice(0, 1);
      let msgString = msgArray.join(' ');
      const playerData = await tier.getIdTier(msgString);
      if(playerData.idResponseStatus === 200){
        const titleString = await tier.getTitleString('RANKED_FLEX_SR');
        const nameString = msgString;
        const valueString = await tier.getValueString(playerData.tier, 'RANKED_FLEX_SR');
        const imgString = await tier.getImgString(playerData.tier, 'RANKED_FLEX_SR');
        const playerIconImgString = await tier.getIconImgString(playerData.id.profileIconId);
        const embed = await tier.getEmbed(titleString, nameString, valueString, imgString, playerIconImgString);

        msg.channel.send({ embed });
      } else {
        msg.reply(`This player doesn't exist.`);
      }
    }())
  }

  if(msgArray[0].toLowerCase() === '!tiertt'){
    (async function(){
      msgArray.splice(0, 1);
      let msgString = msgArray.join(' ');
      const playerData = await tier.getIdTier(msgString);
        if(playerData.idResponseStatus === 200){
          const titleString = await tier.getTitleString('RANKED_FLEX_TT');
          const nameString = msgString;
          const valueString = await tier.getValueString(playerData.tier, 'RANKED_FLEX_TT');
          const imgString = await tier.getImgString(playerData.tier, 'RANKED_FLEX_TT');
          const playerIconImgString = await tier.getIconImgString(playerData.id.profileIconId);
          const embed = await tier.getEmbed(titleString, nameString, valueString, imgString, playerIconImgString);

          msg.channel.send({ embed });
        } else {
          msg.reply(`This player doesn't exist.`);
        }
    }())
  }
});

//Connect the bot
client.login(options.token);
