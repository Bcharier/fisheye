  export class Media {
    constructor(type) {
      if (type === "jpg") return new createPhoto();
      if (type === "mp4") return new createVideo();
    }
  }
  
  export class Photo extends Media {
    constructor(props) {
      this.title = link.replace(".jpg", "").replaceAll("_", " ");
      this.id = props.id;
      this.photographerId = photographerId;
      this.link = path + link;
      this.tags = tags;
      this.likes = likes;
      this.date = new Date(date);
      this.price = price;
      this.alt = alt;
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
  