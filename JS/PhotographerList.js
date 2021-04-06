export class PhotographerList {
    constructor () {
      this.photographerList = []
    }
  
    addPhotographer (photographer) {
      this.photographerList.push(photographer)
    }
  
    getPhotographerList (...tags) {
      let tagList = []
  
      if (tags.length !== 0) {
        this.photographerList.forEach((photograph) => {
          photograph.tags.forEach((tag) => {
            if (tags.includes(tag) && !tagList.includes(photograph)) {
              tagList.push(photograph)
            }
          })
        })
      } else {
        tagList = this.photographerList.slice()
      }
  
      return tagList
    }
  
    getTags () {
      const tags = []
  
      this.photographerList.forEach((photographer) => {
        photographer.tags.forEach((tag) => {
          tags.push(tag)
        })
      })
  
      return new Set(tags)
    }
  }