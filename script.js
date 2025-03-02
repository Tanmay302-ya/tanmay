function convertToIEEE754() {
    const decimalInput = parseFloat(document.getElementById("decimalInput").value);
    const binaryOutput = document.getElementById("binaryOutput");

    if (isNaN(decimalInput)) {
        binaryOutput.textContent = "Please enter a valid number.";
        return;
    }

    // Handle zero separately
    if (decimalInput === 0) {
        binaryOutput.textContent = "0 00000000 00000000000000000000000";
        return;
    }

    // Determine sign bit (0 for positive, 1 for negative)
    const signBit = decimalInput < 0 ? "1" : "0";
    let absNumber = Math.abs(decimalInput);

    // Normalize the number (find mantissa and exponent)
    let exponent = 0;
    while (absNumber >= 2) {
        absNumber /= 2;
        exponent++;
    }
    while (absNumber < 1 && absNumber !== 0) {
        absNumber *= 2;
        exponent--;
    }

    // IEEE 754 exponent bias for single precision (127)
    const biasedExponent = exponent + 127;

    // Convert mantissa (fraction part) to binary
    let mantissa = "";
    absNumber -= 1; // Subtract 1 to get the fractional part after the implicit leading 1
    for (let i = 0; i < 23; i++) {
        absNumber *= 2;
        if (absNumber >= 1) {
            mantissa += "1";
            absNumber -= 1;
        } else {
            mantissa += "0";
        }
    }

    // Convert biased exponent to 8-bit binary
    let exponentBinary = biasedExponent.toString(2);
    while (exponentBinary.length < 8) {
        exponentBinary = "0" + exponentBinary;
    }

    // Ensure mantissa is 23 bits
    while (mantissa.length < 23) {
        mantissa += "0";
    }

    // Format output: sign bit + space + exponent + space + mantissa
    const result = `${signBit} ${exponentBinary} ${mantissa}`;
    binaryOutput.textContent = result;
}
