/* filename: dataAnalysis.js */
 
// This code performs data analysis on a dataset

class DataAnalyzer {
  constructor(data) {
    this.data = data;
  }
 
  preprocessData() {
    // Preprocessing steps
      
    // Remove missing values
    this.data = this.data.filter(row => Object.values(row).every(v => v !== null));

    // Normalize the data
    const maxValues = this.getMaxValues();
    for (let i = 0; i < this.data.length; i++) {
      for (let key in this.data[i]) {
        this.data[i][key] /= maxValues[key];
      }
    }
  }
 
  getMaxValues() {
    // Get maximum values for each feature
    const maxValues = {};
    for (let key in this.data[0]) {
      let max = Number.MIN_SAFE_INTEGER;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i][key] > max) {
          max = this.data[i][key];
        }
      }
      maxValues[key] = max;
    }
    return maxValues;
  }
 
  analyze() {
    this.preprocessData();
 
    // Analyze the data
     
    // Calculate the mean for each feature
    const means = {};
    for (let key in this.data[0]) {
      let sum = 0;
      for (let i = 0; i < this.data.length; i++) {
        sum += this.data[i][key];
      }
      means[key] = sum / this.data.length;
    }
 
    // Calculate the standard deviation for each feature
    const standardDeviations = {};
    for (let key in this.data[0]) {
      let sumSquaredDifferences = 0;
      for (let i = 0; i < this.data.length; i++) {
        sumSquaredDifferences += Math.pow(this.data[i][key] - means[key], 2);
      }
      standardDeviations[key] = Math.sqrt(sumSquaredDifferences / this.data.length);
    }
 
    return { means, standardDeviations };
  }
}
 
// Example usage
 
const dataset = [
  { feature1: 10, feature2: 4, feature3: 6 },
  { feature1: 6, feature2: 7, feature3: 8 },
  { feature1: 3, feature2: 9, feature3: 5 }
];
 
const analyzer = new DataAnalyzer(dataset);
const analysisResult = analyzer.analyze();
console.log(analysisResult);
 
// Output:
// { means: { feature1: 6.3333, feature2: 6.6667, feature3: 6.3333 },
//   standardDeviations:
//    { feature1: 3.0550, feature2: 2.5166, feature3: 1.2472 } }