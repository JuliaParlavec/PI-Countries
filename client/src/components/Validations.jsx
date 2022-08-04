export function validate(input) {
    let errors = {};
    if(!input.name || input.name.length < 3){
      errors.name ="Name is required and has to be longer" 
    }   
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {
      errors.name = 'Activity name is invalid';
    } 
    if(!input.difficulty){
      errors.difficulty ="Please select difficulty"
    }  
    if(!input.duration){
      errors.duration ="Please select duration"
    } 
    if(!input.season){
      errors.season ="Please select season"
    } 
    if(input.countries.length === 0){
      errors.countries ="Please select the countries where this activity is practiced"
    } 
    
    return errors;
  }
