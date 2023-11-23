// Set URL as a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initialize the dashboard with default graphs
function init() {
    // Select the menu dropdown with D3
    let menuItems = d3.select("#selDataset");

    // Fetch JSON data and perform operations
    d3.json(url).then((data) => {
        // Set names variable for sample names
        let names = data.names;

        // Iterate through all names and add them to the dropdown menu items
        names.forEach((name) => {
            menuItems.append("option")
                .text(name)
                .property("value", name);
        });

        // Set the first name from samples
        let firstSample = names[0];
        console.log(firstSample);

        // Call functions to initialize graphs
        showDemographics(firstSample);
        showBarChart(firstSample);
        showBubbleChart(firstSample);
    });
}

// Function to display demographic info
function showDemographics(sample) {
    // Retrieve Data
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        // Filter based on sample
        let sampleMetadata = metadata.filter((value) => value.id == sample);

        console.log(sampleMetadata);

        // Retrieve value at index 0
        let firstSampleMetadata = sampleMetadata[0];

        // Clear out the sample metadata
        d3.select("#sample-metadata").html("");

        // Populate key-value pairs in the dashboard
        Object.entries(firstSampleMetadata).forEach(([key, value]) => {
            console.log(key, value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
}

// Function to display bar chart
function showBarChart(sample) {
    // Retrieve data
    d3.json(url).then((data) => {
        // Get sample data
        let sampleObjects = data.samples;

        // Filter based on sample 
        let sampleData = sampleObjects.filter((value) => value.id == sample);

        // Retrieve value at index 0
        let firstSampleData = sampleData[0];

        // Set variables to be plotted
        let sampleValues = firstSampleData.sample_values;
        let otuIds = firstSampleData.otu_ids;
        let otuLabels = firstSampleData.otu_labels;

        console.log(otuIds, otuLabels, sampleValues);

        // Trace bar chart for top 10 results
        let trace = [{
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIds.slice(0, 10).map((otuId) => `OTU ${otuId}`).reverse(),
            text: otuLabels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        // Call Bar Chart with Plotly
        Plotly.newPlot("bar", trace);
    });
}

// Function to display bubble chart
function showBubbleChart(sample) {
    // Retrieve data
    d3.json(url).then((data) => {
        // Get sample data
        let sampleObjects = data.samples;

        // Filter based on sample 
        let sampleData = sampleObjects.filter((value) => value.id == sample);

        // Retrieve value at index 0
        let firstSampleData = sampleData[0];

        // Set variables to be plotted
        let sampleValues = firstSampleData.sample_values;
        let otuIds = firstSampleData.otu_ids;
        let otuLabels = firstSampleData.otu_labels;

        console.log(otuIds, otuLabels, sampleValues);

        // Trace bubble chart
        let trace = [{
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            }
        }];

        // Layout for bubble chart
        let layout = {
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
        };

        // Plot with Plotly
        Plotly.newPlot("bubble", trace, layout);
    });
}

// Function to update dashboard when the sample is changed
function optionChanged(sample) {
    console.log(sample);

    showDemographics(sample);
    showBarChart(sample);
    showBubbleChart(sample);
}

// Call the init function to start the dashboard
init();

