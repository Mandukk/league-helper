//Import packages
import fetch from 'node-fetch';

//Import files
import options from './options';

//Create the object to be exported
let tier = {};

//Function to get the id of the player
tier.getId = function(nick){
  return fetch(`https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${nick}`, {headers: options.headerOptions});
};

//Function to get the tier of the player
tier.getTier = function(id) {
  return fetch(`https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/${id}`, {headers: options.headerOptions});
};

//Function to get the id and the tier of the player
tier.getIdTier = async function(nick){
    const idResponse = await this.getId(nick);
    const id = await idResponse.json();
    const tierResponse = await this.getTier(id.id);
    const tier = await tierResponse.json();
    return {
        id,
        tier
    };
};

tier.getTitleString = async function(queue){
  if(queue === 'RANKED_SOLO_5x5'){
    return 'SOLO/DUO TIER';
  } else if(queue === 'RANKED_FLEX_SR'){
    return 'SR FLEX TIER';
  } else if(queue === 'RANKED_FLEX_TT'){
    return 'TT FLEX TIER';
  }
}


tier.getValueString = async function(playerTierResults, queue){
  let string = '';
  playerTierResults.forEach((tiers, index) => {
    if(tiers.queueType === queue){
      if(tiers.tier === 'MASTER' || tiers.tier === 'CHALLENGER'){
        let model = `${tiers.tier}`;
        string = model;
      } else {
        let model = `${tiers.tier} ${tiers.rank}`;
        string = model;
      }
    }
  });
  if(string === ''){
    string = `This player does not have a tier!`;
  }
  return string;
};

tier.getImgString = async function(playerTierResults, queue){
  let imgString = '';
  playerTierResults.forEach((tiers, index) => {
    if(tiers.queueType === queue){
      if(tiers.tier === 'MASTER' || tiers.tier === 'CHALLENGER'){
        let model = `http://res.cloudinary.com/dtidk81ya/image/upload/v1494882728/${tiers.tier}.png`;
        imgString = model;
      } else {
        let model = `http://res.cloudinary.com/dtidk81ya/image/upload/v1494882728/${tiers.tier}_${tiers.rank}.png`;
        imgString = model;
      }
    }
  });
  if(imgString === ''){
    let model = 'http://res.cloudinary.com/dtidk81ya/image/upload/v1494882728/provisional.png';
    imgString = model;
  }
  return imgString;
};

tier.getIconImgString = async function(iconId){
  return `http://ddragon.leagueoflegends.com/cdn/7.9.1/img/profileicon/${iconId}.png`;
}

tier.getEmbed = async function(titleString, nameString, valueString, imgString, playerIconImgString){
  let embed = {
            "title": titleString,
            "color": 7077888,
            "author": {
                "name": "League Helper",
                "url": "https://discordapp.com",
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "image": {
            "url": imgString
            },
            "thumbnail": {
                "url": playerIconImgString
            },
            "fields": [
                {
                "name": nameString,
                "value": valueString
                }
            ]
          };
  return embed;
}


export default tier;
