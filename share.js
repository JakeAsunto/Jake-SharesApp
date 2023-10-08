const { color, jake, verify, fs } = require("./dependency");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

global.shares = 0;
global.tokens = config.tokens;
global.links = config.links;

!async function loop() {
const loopTimerSetting = config.loopTimerInterval; // seconds
const loopCountSetting = config.loopCountAmount; 
// Number of times to loop 👆
var count = 0;
while (count < loopCountSetting) {
console.log(jake.bold.hex("#16E2F5")(
  `[ START ]\nStarting...\n\n`
) + jake.bold.hex("#59E817")(
  `[ INFO ]\nLoop Count: ${count}\nLoop Timer Setting: ${loopTimerSetting}s\nLoop Target: ${loopCountSetting}`
));
console.log(jake.bold.hex("#6AFB92")("\n[ TOTAL SHARES ] » ") + jake.hex("#6AFB92")(global.shares + "\n"));
// YOU CAN REMOVE ONE OR MORE "await run();"
// IF YOU WANT TO ADJUST THE SPEED OF THE SHARES (SLOW IT DOWN)
await run();
await run();
await run();
// await run();
// await run();
// await run();
// await run();
// await run();
// await run();
// OR YOU CAN ADD MORE OF "await run();"
// TO MAKE YOUR SHARES FASTER! THOUGH NOT RECOMMENDED BECAUSE OF RATE LIMITS!
// IF YOU DO IT FASTER, YOUR TOKEN MAY GET RATE LIMITED!
count++;
console.clear();
console.log(jake.bold.hex("#01F9C6")(`[ RUNTIME ]\nShares Runtime Count: ${count}\n`));
}
  
async function restart() {
  if (count >= loopCountSetting) {
    await run();
    await run();
    await run();
  // this is the last run, it will restart the script after...
  console.log(jake.bold.hex("#00FF00").bold("\n[ SUCCESS ]\n") + jake.hex("#00FF00")("Successfully ran the script " + count + " times."));
 console.log(jake.bold.hex("#00FF00")("[ TOTAL SHARES ]\nFinal: ") + jake.hex("#00FF00")(`${global.shares}`));
    count = 0;
    console.log(jake.bold.hex("#F535AA")("Looping Share API..."));
    console.log("Runtime Count: " + "[" + jake.hex("#59E817")`${count}` + "]");
    await wait(loopTimerSetting * 100 * 60);
    loop();
      }
    };
  
setTimeout(restart, loopTimerSetting * 500); // 0.5 * 500 = 250ms
// The longer you set in config.json you longer before the script restarts.
// (This is because the script is restarted after the script finishes the last runtime preset.)
}(verify());

   /!- [ async function run ] -!/

async function run() {
const {
  jake,
  axios,
  color,
  UserAgent
} = require("./dependency");
const userAgents = new UserAgent();
const proxy_list = [
    {
        protocol: 'https',
        host: '149.129.239.170',
        port: 9272
    },
    //...
    {
        protocol: 'https',
        host: '132.129.121.148',
        port: 8110
    },
    {
        protocol: 'https',
        host: '154.129.98.156',
        port: 8227
    },
    {
        protocol: 'https',
        host: '211.129.132.150',
        port: 2530
    },
    {
        protocol: 'https',
        host: '164.129.114.111',
        port: 5370
    }
  // ADD MORE PROXIES IF YOU WANT AND KNOW WHAT YOU'RE DOING.
];
let random_index = Math.floor(Math.random() * proxy_list.length);

var headers = {
    'proxy': proxy_list[random_index],
    'authority': 'graph.facebook.com',
    'user-agent': userAgents.toString(),
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': "Windows",
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1'
};
 
              /!-- GLOBAL SETTINGS --!/

global.deleteTemp = new Set();
global.deleteToken = new Set();

  for (var i = 0; i < global.tokens.length; i++) {
  for (var l = 0; l < global.links.length; l++) {
  const token = global.tokens[i];
  const post = global.links[l];
  try {
  if (token == "" || token == undefined) { console.log(`Token Array is Empty. [${jake.hex("#FF0000")`${i}`}]`);
   return;
  } else if (post == "" || post == undefined) { console.log("Link Array Is Empty."); return; }
  const res = await axios.post(`https://graph.facebook.com/me/feed?link=${post}&published=0&access_token=${token}`, { headers });
  if (res.status && res.status == 200) {
    console.log(jake.bold.hex("#16F529")(`POST AUTO SHARE SUCCESS!\nToken Location: Array[${i}]\nLink: [${l}]`));
    const postId = (res.data.id ? res.data.id : false);
    if (postId) {
    global.deleteTemp.add(postId);
    global.deleteToken.add(token);
    await deletePost();
    }
    global.shares++;
    console.log(jake.bold.hex("#16E2F5")(`Total Shares: ${global.shares}`));
    } 
  } catch (err) {
// UNCOMMENT THIS 👇👇 IF YOU WANT TO GET ERRORS LOGGED.
// console.log(chalk.bold.hex("#FF0000").bold("[ FAILED ]\n") + (err.response && err.response.headers ? err.response["headers"]["www-authenticate"] : err) + "\n" + "Location: [" + i + "]");
  console.log(jake.bold.hex("#FF0000")(`POST AUTO SHARE FAILED!\nTokenArray: [${i}]\nLink: [${l}]`));
    continue;
    // console.log(err)
            }
        }
    }
}

async function deletePost() {
const { jake } = require("./dependency");
  if (global.deleteTemp.size <= 0 && global.deleteToken.size <= 0) {
    return console.log(jake.bold.hex("#FF0000")`[ DeletePost ]\n` + jake.hex("#FF0000")`Token data is currently empty.`);
}
  const deleteArr = Array.from(global.deleteTemp);
  const deleteTokenArr = Array.from(global.deleteToken);
for (var d = 0; d <= deleteArr.length && d <= deleteTokenArr.length; d++) {
  const postID = deleteArr[d];
  const token = deleteTokenArr[d];
  try {
const { axios } = require("./dependency");
const res = await axios.delete(`https://graph.facebook.com/${postID}?access_token=${token}`);
    if (res.status && res.status == 200) {
 console.log(jake.bold.hex("#00FF00")(`DELETE POST SUCCESS! TokenArr: [${d}]\nDelete Post NO.: [${d}]\nLength: ${global.deleteTemp.length}\nLength: ${global.deleteToken.length}`));
      global.deleteTemp.delete(postID);
      global.deleteToken.delete(token);
    } else {
      console.log(jake.bold.hex("#FF0000")(`DELETE POST FAILED! TokenArr: [${d}]\nDelete Post NO.: [${d}]\nLength: ${global.deleteTemp.length}\nLength: ${global.deleteToken.length}`));
      global.deleteTemp.delete(postID);
      global.deleteToken.delete(token);
    }
   /* global.deleteTemp.splice(d, 1);
    global.deleteToken.splice(d, 1);*/
   // global.deleteTemp[d].pop();
   /* if (global.deleteToken.length > 0)
    delete global.deleteToken[d]; */
         } catch (err) {
       /* const error = setTimeout(() => { console.log(err.response["headers"]["www-authenticate"]);
            }, 96000);
    clearTimeout(error); */
  console.log(jake.bold.hex("#FF0000")`[ FAILED ]\n${(err.response && err.response.headers ? err.response["headers"]["www-authenticate"] : err)}`);
    if ( global.deleteTemp.size > 0 && global.deleteToken.size > 0 ) {
     global.deleteTemp.delete(postID);
     global.deleteToken.delete(token);
                  }
    // console.log(err);
           }
      }
}

function wait (ms) {
    return new Promise(async (resolve, reject) => {
     await setTimeout(resolve, ms);
    });
}


setInterval(() => { console.clear(); }, 1440000);
setInterval(() => { console.clear(); }, 1440000);
setInterval(() => { console.clear(); }, 1440000);
setInterval( verify, 5 );

module.exports = {
  links: global.links
};
// CREATED BY: Jake Dev/Jake Asunto
// Github: (https://github.com/JakeAsunto);
