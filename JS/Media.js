export class Media {
  createMedia (id, photographerId, type, link, tags, likes, date, price, alt, path) {
    if (type === "jpg") {
      const photo = new Photo();
      photo.title = link.replace(".jpg", "").replaceAll("_", " ");
      photo.id = id;
      photo.photographerId = photographerId;
      photo.link = path + link;
      photo.tags = tags;
      photo.likes = likes;
      photo.date = new Date(date);
      photo.price = price;
      photo.alt = alt;
      return photo
    } else if (type === "mp4") {
      const video = new Video();
      video.title = link.replace(".mp4", "").replaceAll("_", " ");
      video.id = id;
      video.photographerId = photographerId;
      video.link = path + link;
      video.tags = tags;
      video.likes = likes;
      video.date = new Date(date);
      video.price = price;
      video.alt = alt;
      return video;
    }
  }
}

export class Photo extends Media {
  getDOMComponent () {
    const relativePathToImg = "Images/Sample-Photos/";
    const picture = document.createElement("picture");
    const source = document.createElement("source");
    const img = document.createElement("img");

    source.srcset = relativePathToImg + this.link;

    img.src = relativePathToImg + this.link;
    img.alt = this.alt;

    picture.append(source);
    picture.append(img);

    return picture;
  }
}

export class Video extends Media {
  getDOMComponent (controls = false) {
    const relativePathToImg = "Images/Sample-Photos/";
    const video = document.createElement("video");
    const videoSource = document.createElement("source");

    video.controls = controls;
    video.muted = true;
    video.loop = true;

    videoSource.src = relativePathToImg + this.link;
    videoSource.alt = this.alt;
    videoSource.type = "video/mp4";

    video.append(videoSource);

    return video;
  }
}
