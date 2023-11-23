# -belly-button-challenge

Website Deployed:

https://tapleenlamba.github.io/-belly-button-challenge/

This project focused on exploring the Belly Button Diversity dataset, which documents the microbial diversity in human navels. The dataset, available at http://robdunnlab.com/projects/belly-button-biodiversity/, identifies operational taxonomic units (OTUs), with some species being prevalent in over 70% of individuals. The goal was to create a dashboard displaying the top ten OTUs for each test subject, showcasing OTU IDs versus Sample Values. 

Key Processes and Technologies:

Loading Data:
The project began by loading the JSON file's URL using the d3.json() function, logging the data to the console.


Function Creation:


Four essential functions were developed - init, createCharts, buildMetadata, and optionChanged.


init: Initializes the dashboard at startup.


createCharts: Sets up selected sample data for the top 10 OTUs per test subject, creating and plotting bar and bubble charts using Plotly.newPlot.


buildMetadata: Constructs metadata for the selected sample.


optionChanged: Updates the dashboard when functions are executed correctly.

This approach ensured a systematic and effective construction of the dashboard, with each function contributing to different aspects of data visualization and user interaction.
