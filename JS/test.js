export class Media {
  createMedia(type) {
    if (type === "jpg") return new Photo();
    if (type === "mp4") return new Video();
  }
}

export class Photo extends Media {
  createPhoto(id, photographerId, link, tags, likes, date, price, alt, path) {
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
  }

  getDOMComponent() {
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
  createVideo(id, photographerId, link, tags, likes, date, price, alt, path) {
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


  getDOMComponent(controls = false) {
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

