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
      //Remove the command on the message
      msgArray.splice(0, 1);
      let msgString = msgArray.join(' ');


      const playerData = await tier.getIdTier(msgString);
      const nameString = await tier.getNameString(msgString);
      const valueString = await tier.getValueString(playerData.tier);
      const imgString = await tier.getImgString(playerData.tier);
      const playerIconImgString = await tier.getIconImgString(playerData.id.profileIconId);
      const embed = await tier.getEmbed(nameString, valueString, imgString, playerIconImgString);

      msg.channel.send({ embed });


    }())

  }
});

//Connect the bot
client.login(options.token);
