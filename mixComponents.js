import images from "images";

var folder = "components";
var components = ["body", "collar", "helmet", "plane", "propeller"];
var file_extension = ".png";
var total_components = components.length;

var num_images_per_component = [4, 4, 4, 4, 4];

generateRandomImage();

export async function generateRandomImage() {
  var randomNumbers = new Array();

  for (var i = 0; i < total_components; i++) {
    var num = Math.floor(Math.random() * num_images_per_component[i] + 1);
    randomNumbers.push(num.toString());
  }

  var blendedImage;

  for (var i = 0; i < total_components; i++) {
    var imageUrl =
      folder + "/" + components[i] + "/" + randomNumbers[i] + file_extension;
    if (i == 0) {
      blendedImage = await images(imageUrl);
    } else {
      blendedImage = await blendedImage.draw(images(imageUrl), 0, 0);
    }
  }

  await blendedImage.save("randomCharacter.png");
}
