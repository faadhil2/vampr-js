class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampCreator = this;;
    let numOfVamps = 0;

    while(vampCreator.creator){
      vampCreator = vampCreator.creator;
      numOfVamps ++
    }
    return numOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisVampAge = this.numberOfVampiresFromOriginal;
    const otherVampAge = vampire.numberOfVampiresFromOriginal;

    if (this.creator === null){
      return true
    }
    if (thisVampAge < otherVampAge){
      return true
    }
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let vampire = null;
   
    if (this.name === name){
      return this;
    }

      for (const offspring of this.offspring){
        vampire = offspring.vampireWithName(name)
        if (vampire){
          break;
        }
      }
      return vampire;
    
  }
  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;

        for (let offspring of this.offspring){
          count += offspring.totalDescendents + 1;
          }
      
        return count
    }

      // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampire = [];
   
    if (this.yearConverted > 1980){
      vampire.push(this);
    }

      for (const offspring of this.offspring){
        const vampire2 = offspring.allMillennialVampires
        vampire = vampire.concat(vampire2)
      }
      return vampire;

  }

/** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let closestCommonAncestor;

    if (this === vampire){
      closestCommonAncestor = this;
    }
    else if (this.creator === null){
      closestCommonAncestor = this;
    }else if(vampire.creator === null){
      closestCommonAncestor = vampire;
    } else if(this.creator === vampire.creator){
      closestCommonAncestor = this.creator;
    } else if (this.numberOfVampiresFromOriginal === 1 && vampire.numberOfVampiresFromOriginal === 1){
      closestCommonAncestor = this.creator;
    }

    else if (this.offspring.includes(vampire)){
      closestCommonAncestor = this;
    } else if (vampire.offspring.includes(this)){
      closestCommonAncestor = vampire;
    }


    return closestCommonAncestor;

  }

  }




module.exports = Vampire;

