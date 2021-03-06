const TEMP_COLORS = [
  [139, 0, 0], //DARK_RED
  [255, 0, 0], //RED
  [255, 36, 0], //SCARLET
  [255, 215, 0], //ORANGE
  [255, 255, 0], //YELLOW
  [27, 142, 45], //RICH_GREEN
  [0, 255, 0], //GREEN
  [135, 206, 235], //SKY_BLUE
  [0, 0, 255], //BLUE
  [128, 0, 128], //PURPLE
  [217, 130, 181], //PINKY_PURPLE
  [255, 0, 255], //MAGENTA
];
const TEMP = [38, 32, 27, 21, 16, 10, 4, -1, -7, -12, -18, -23];
//colorChannelA and colorChannelB are ints ranging from 0 to 255
const colorChannelMixer = (
  colorChannelA: number,
  colorChannelB: number,
  amountToMix: number
) => {
  var channelA = colorChannelA * amountToMix;
  var channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
const colorMixer = (
  rgbA: Array<number>,
  rgbB: Array<number>,
  amountToMix: number,
  opacity: number
) => {
  var r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  var g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  var b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
  return "rgba(" + r.toFixed(0) + "," + g.toFixed(0) + "," + b.toFixed(0) + "," + opacity + ")";
};

export const TemperatureColorGenerator = (temp: number, opacity: number = 0.5) => {
  if (temp >= TEMP[0]) return `rgb(${TEMP_COLORS[0]}, ${opacity})`;
  if (temp <= TEMP[TEMP.length - 1])
    return `rgba(${TEMP_COLORS[TEMP.length - 1]}, ${opacity})`;
  for (let x = 0; x < TEMP.length - 1; x++) {
    if (TEMP[x] === temp) return `rgba(${TEMP_COLORS[x]}, ${opacity})`;

    if (temp < TEMP[x] && temp > TEMP[x + 1]) {
      let max = TEMP[x],
        min = TEMP[x + 1];
      let ratio = (temp - min) / (max - min);
      return colorMixer(TEMP_COLORS[x], TEMP_COLORS[x + 1], ratio, opacity);
    }
  }

  return `rgb(0,0,0,1)`;
};
