//Another good way to do fizzbuzz
let { parse } = require('zipson');
let answer = "|ÊË¨Fizz¨Í¨Buzz¨ß0ÐÑß0ß1¤Bß0¤D¤E¨FizzBuzz¨¤G¤Hß0¤Jß1ß0¤M¤Nß0ß1¤Qß0¤S¤Tß2¤V¤Wß0¤Yß1ß0¤b¤cß0ß1¤fß0¤h¤iß2¤k¤lß0¤nß1ß0¤q¤rß0ß1¤uß0¤w¤xß2¤z¢10ß0¢12ß1ß0¢15¢16ß0ß1¢19ß0¢1B¢1Cß2¢1E¢1Fß0¢1Hß1ß0¢1K¢1Lß0ß1¢1Oß0¢1Q¢1Rß2¢1T¢1Uß0¢1Wß1ß0¢1Z¢1aß0ß1÷"
for(line of parse(answer)){console.log(line)}