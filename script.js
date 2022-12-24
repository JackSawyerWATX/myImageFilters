var canvas = document.getElementById("canvas1");
var fileinput = document.getElementById("loadImg");
var image = document.getElementById("image");
let originalImg = null;
var point1, point2, point3, point4, point5, point6;
var height;
var avg;
var image = null;

function loadImage() {
  image = new SimpleImage(fileinput);
  var filename = fileinput.value;
  image.drawTo(canvas1);
}

function makeGray() {
  var newImg = document.getElementById("canvas2");
  for (var pixel of image.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  image.drawTo(canvas2);
}

function redImage() {
  var newImg = image;
  if (loadImg(newImg)) {
    for (var pixel of newImg.values()) {
      pixel.setRed(255);
    }
    newImg.drawTo(canvas2);
  } else {
    alert("Image has not been loaded");
  }
}

function greenImage() {
  var newImg = image;
  if (loadImg(newImg)) {
    for (var pixel of newImg.values()) {
      pixel.setGreen(255);
    }
    newImg.drawTo(canvas2);
  } else {
    alert("Image has not been loaded");
  }
}

function blueImage() {
  var newImg = image;
  if (loadImg(newImg)) {
    for (var pixel of newImg.values()) {
      pixel.setBlue(255);
    }
    image.drawTo(canvas2);
  } else {
    alert("Image has not been loaded");
  }
}

function frameImage() {
  var newImg = image;
  if (loadImg(newImg)) {
    for (var pixel of newImg.values()) {
      if (
        pixel.getY() >= newImg.getHeight() - 30 ||
        pixel.getX() >= newImg.getWidth() - 30 ||
        pixel.getY() == newImg.getHeight() + 30 ||
        pixel.getX() == newImg.getWidth() + 30
      ) {
        pixel.setRed(0);
        pixel.setBlue(0);
        pixel.setGreen(0);
      }
    }

    newImg.drawTo(canvas2);
  } else {
    alert("Image has not been loaded");
  }
}
function loadImg(imageFile) {
  if (imageFile === null || !imageFile.complete()) {
    return false;
  }
  return true;
}

function divideIntoSevenRows(imageFile) {
  var newImg = image;
  height = image.getHeight();
  point1 = height / 7;
  point2 = (height * 2) / 7;
  point3 = (height * 3) / 7;
  point4 = (height * 4) / 7;
  point5 = (height * 5) / 7;
  point6 = (height * 6) / 7;
}

function filterColor(pixel, red, green, blue, avg) {
  if (avg < 128) {
    pixel.setRed((red / 127.5) * avg);
    pixel.setGreen((green / 127.5) * avg);
    pixel.setBlue((blue / 127.5) * avg);
  } else if (avg >= 128) {
    pixel.setRed((2 - red / 127.5) * avg + 2 * red - 255);
    pixel.setGreen((2 - green / 127.5) * avg + 2 * green - 255);
    pixel.setBlue((2 - blue / 127.5) * avg + 2 * blue - 255);
  }
  return pixel;
}

function avgRgbValues(pixel) {
  var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
  return avg;
}

function filterRow(img, red, green, blue, startPoint, endPoint) {
  for (var pixel of image.values()) {
    var avg = avgRgbValues(pixel);
    if (pixel.getY() > startPoint && pixel.getY() <= endPoint) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}

function rainbowFilter() {
  // let image = originalImg;
  divideIntoSevenRows(image);
  filterRow(image, 255, 0, 0, 0, point1);
  filterRow(image, 255, 165, 0, point1, point2);
  filterRow(image, 255, 255, 0, point2, point3);
  filterRow(image, 0, 255, 0, point3, point4);
  filterRow(image, 0, 0, 255, point4, point5);
  filterRow(image, 75, 0, 130, point5, point6);
  filterRow(image, 143, 0, 255, point6, height);
  image.drawTo(canvas2);
}

function doClear(canvas) {
  var context = canvas2.getContext("2d");
  context.clearRect(0, 0, canvas2.width, canvas2.height);
}

function resetImage() {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  originalImg = new SimpleImage(loadImg);
  originalImg.drawTo(canvas2);
}
