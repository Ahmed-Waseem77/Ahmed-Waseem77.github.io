/**
 * Generates a box-shadow string for stars.
 * @param count - Number of stars to generate.
 * @param size - (Optional) The spread radius in pixels. 
 * @param blur - (Optional) The blur radius in pixels. 
 * 0 = exact size of the base div. 
 * 1 = adds 1px on all sides (making a 1px div into a 3px star).
 */
export const generateStars = (count: number, size: number = 0, blur: number = 0) => {
  let shadow = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000); 
    const y = Math.floor(Math.random() * 2000);
    
    // Syntax: offset-x | offset-y | blur-radius | spread-radius | color
    shadow += `${i > 0 ? ", " : ""}${x}px ${y}px ${blur}px ${size}px #FFF`;
  }
  return shadow;
};
