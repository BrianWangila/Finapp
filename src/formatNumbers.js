export function formatNumberWithCommas(number) {
    // Convert the number to a float with 2 decimal places
    const fixedNumber = parseFloat(number).toFixed(2);
    
    // Split into integer and decimal parts
    const [integerPart, decimalPart] = fixedNumber.split('.');
    
    // Add commas to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Return the formatted number with the decimal part
    return `${formattedInteger}.${decimalPart}`;
  }