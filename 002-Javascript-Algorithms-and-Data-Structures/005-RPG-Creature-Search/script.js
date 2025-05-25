const USERINPUT             = document.getElementById("search-input");
const SEARCHBUTTON          = document.getElementById("search-button");
const CREATURENAME          = document.getElementById("creature-name");
const CREATUREID            = document.getElementById("creature-id");
const CREATURESPECIAL       = document.getElementById("special-name");
const CREATURESPECIALDESC   = document.getElementById("special-description");
const CREATUREWEIGHT        = document.getElementById("weight");
const CREATUREHEIGHT        = document.getElementById("height");
const CREATURETYPE          = document.getElementById("type");
const CREATUREHP            = document.getElementById("hp");
const CREATUREATK           = document.getElementById("attack");
const CREATUREDEF           = document.getElementById("defense");
const CREATURESPECATK       = document.getElementById("special-attack");
const CREATURESPECDEF       = document.getElementById("special-defense");
const CREATURESPEED         = document.getElementById("speed");

// Use the endpoint https://rpg-creature-api.freecodecamp.rocks/api/creature/{name-or-id} to get data for a creature, where {name-or-id} is the creature's name or ID number.
const CREATURDATAAPI = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";


SEARCHBUTTON.addEventListener("click", async (e) => {
  e.preventDefault();

  const creatureData = await fetchCreatureData(USERINPUT.value);
  displayCreatureData(creatureData); 
})

const fetchCreatureData = async (input) => {
  try {
    const creatureData = 
      await fetch(`${CREATURDATAAPI}${input}`)
      .then(response => response.json())
      .catch(error => {
        console.error("Error fetching creature data:", error);
        alert("Creature not found. Please try again.");
      });
      return creatureData;
  }
  catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching data. Please try again.");
    return;
  }
}

const displayCreatureData = (data) => {
  // console.log(data);
  if (!data) {
    alert("No data to display.");
    return;
  }
  const {
    id, name, weight, height,
    special: 
      { name: specialName, description: specialDesc }
    ,    
    types: [
      { name: typeName }
    ], 
    stats: [
      { base_stat: hp },
      { base_stat: attack },
      { base_stat: defense },
      { base_stat: specialAttack },
      { base_stat: specialDefense },
      { base_stat: speed }
    ]
  } = data; 

  console.log(`
    ID: ${id}\n
    Name: ${name}\n
    Weight: ${weight}\n
    Height: ${height}\n
    Type: ${typeName}\n
    Special Name: ${specialName}\n
    Special Desc: ${specialDesc}\n
    HP: ${hp}\n
    Attack: ${attack}\n
    Defense: ${defense}\n
    Special Attack: ${specialAttack}\n
    Special Defense: ${specialDefense}\n
    Speed: ${speed}
  `);

  CREATUREID.innerText = id;
  CREATURENAME.innerText = name;
  CREATUREWEIGHT.innerText = weight;
  CREATUREHEIGHT.innerText = height;
  CREATURETYPE.innerText = typeName;
  CREATURESPECIAL.innerText = specialName;
  CREATURESPECIALDESC.innerText = specialDesc;
  CREATUREHP.innerText = hp;
  CREATUREATK.innerText = attack;
  CREATUREDEF.innerText = defense;
  CREATURESPECATK.innerText = specialAttack;
  CREATURESPECDEF.innerText = specialDefense;
  CREATURESPEED.innerText = speed;
}