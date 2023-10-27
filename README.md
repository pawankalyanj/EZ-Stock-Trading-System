# EZ-Stock-Trading-System
# Introduction
Trading stocks can be a great way for individuals to make money by buying and selling stocks. However, the practice of trading stocks comes with a high level of risks, in the sense of losing money. This is primarily due to the stock market’s volatile nature. For example, there is a high probability that inexperienced stock traders to lose money, rather than making profit. Making a wrong investment can lead an individual to lose capital, damage their reputation, as well as cause an enormous amount of stress.
<br />
<br />
To address this issue, automated stock trading has gained popularity in modern times. In such platforms, artificial intelligence and machine learning models are utilized to execute stock trades with a higher level of success rate, when compared to human stock traders. These stock trading platforms analyze the stock market, then make a prediction on whether the stock price of a particular company will increase or decrease.
Although automated stock trading platforms seem promising, they are not without any flaws. These systems are still susceptible to making bad investments in the stock market. In response to this challenge, our team proposes to develop a full-stack application where users are able to trade stocks through a combination of algorithmic and polling process, which is conducted by other users on the platform. We will be using Yahoo Finance (yfinance) library to obtain historical stock price data of various companies. Using machine learning methodologies, we will be training a Long-Short Term Memory (LSTM) model using the obtained historical dataset. To improve the accuracy of the model, we will be utilizing the ELO algorithm to incorporate a user-based polling system.
<br />
<br />
The user on the EZ Stock Trader platform can specify a certain threshold, where once the poll reaches up to a certain level, the system will automatically buy or sell stock, based on the user's preferences. We believe that by combining both machine learning algorithms and user polling inputs, we can achieve a higher level of accuracy in predicting stock prices, yielding a more pleasant and stress-free experience for users on the EZ Stock Trader system.
# Proposed Areas of Study and Academic Contribution
The stock market is an environment where stock traders and investors can buy or sell their shares of public companies' stock. Due to volatility in the market, investing involves high risks. This includes a company’s financial status, performance, and the global economy that contribute to the price fluctuation of shares. Users with a lack of experience in trading stock may face numerous challenges in the stock market. In addition, they are likely to lose money as a consequence of making poor investment decisions.
Because of this problem domain, we propose to develop an automatic stock trading system, which will assist the end user in either buying or selling stocks. We mainly focus on the tasks such as market data analysis using deep learning algorithms and providing a better design for user experience and their engagement with the application. Before investing in a particular company’s stock, the user must consider a statistical, as well as a general analysis of the company in order to determine the stock’s value and worth.
<br />
<br />
In order to achieve statistical analysis, we can utilize deep learning models to evaluate the stock trends of any given company. For this project, we aim to utilize the LSTM model, as it has proved to be a promising choice of model for analyzing historical stock data. In contrast, the general analysis can be achieved through a user-based polling system, where the end user can be notified of any black swan events, as a result of experienced stock traders rating the stock trend of a particular company. We aim to provide abstraction by reducing the dependency on an in-depth market understanding. This lets users make informed decisions and improve strategy-making capabilities with a basic knowledge; especially when building a long-term portfolio, in which a company's fundamentals play a crucial role.
<br />
<br />
The insights we gain from the application can contribute to academic research in the field of deep learning based on the predictions and accuracy of the algorithms used in the application. Good performance of the algorithms can lead to novel strategies in the field of stock trading and the financial sector.
# Current State of the Art
We have implemented comprehensive features for our application which include LSTM models for predictive analysis, developed front-end components and API, integrated ELO algorithm, and designed web pages and UI templates.
Front-end components and the APIs were designed and integrated keeping ease of use for the user as an essential consideration. Any user regardless of their technical expertise can interact and use the application efficiently, so that the users can focus on their needs rather than understanding the complex interfaces. We have completed the sign in, sign up and homepage front end pages and implemented necessary backend APIs to handle requests from the front-end. We have also designed responsive and intuitive UI templates to keep front-end visuals consistent with all our application's pages.
<br />
<br />
In regard to the user polling system, we have started with integration of ELO algorithm into our project utilizing its ranking capabilities for this feature. Our goal was to provide a fair and effective ranking system for the users, which will help them to compare their trading trends with other traders within our domain.
<br />
<br />
In conclusion, our project uses cutting-edge web construction tools and machine learning techniques to build a comprehensive system for user interaction and predictive analysis. The development of front-end components and APIs, the integration of the ELO algorithm, the use of web page design with UI templates, the implementation of LSTM models with data preprocessing, model configuration, training, evaluation, and deployment, and all of these are crucial elements that have been carefully created to offer the best experience for our users.
# Project Architecture
# Introduction
![295A Arch Diagram (1)](https://github.com/pawankalyanj/EZ-Stock-Trading-System/assets/98665897/1e0321e7-661e-423e-a97f-ed6f072c52a6)

The full-stack application for stock price prediction is designed to provide users with an easy-to-use interface that allows them to select a company, specify a start and end date for historical data, and run the machine learning algorithm. The architecture of this application comprises various components, including a user interface, server, database, AWS Lambda function, Yfinance library, and machine learning algorithm.
The user interface is built using React, a JavaScript library for building user interfaces. It allows users to interact with the application by providing input parameters such as the company, start and end dates for historical data, and a rating of buy/sell trends via the User polling system. The input parameters are sent to the server, which processes the request.
<br />
<br />
The server is built using Node.js, a JavaScript runtime environment. It receives the input parameters from the user interface and sends them to the AWS Lambda function. The server also serves as an intermediary between the user interface and the MongoDB database, which stores all the data related to stock prices, predicted prices, and previous predictions. The AWS Lambda function is responsible for pulling the data using the Yfinance library, running the machine learning algorithm on it, and returning the results to the server. It is hosted on AWS, which provides a scalable and reliable infrastructure for running serverless functions. The Yfinance library is a Python library that allows the AWS Lambda function to pull stock price data from Yahoo Finance. The library is used to extract historical data for the specified time frame, which is then used as input to the machine learning algorithm.
<br />
<br />
The machine learning algorithm is responsible for predicting the stock price for the specified time frame. It is trained on historical data and uses LSTM. LSTM models have shown great promise in predicting stock prices due to their ability to handle time-series data and capture long-term dependencies. These models use a series of memory blocks to selectively remember and forget important patterns in the data, allowing them to identify complex trends in the market. By learning from historical data, LSTM models can make accurate predictions of future prices, enabling investors and traders to make more informed investment decisions. As a result, LSTM models are becoming an increasingly popular tool in the field of stock prediction
<br />
<br />
Overall, this architecture provides a robust and scalable solution for stock price prediction. It leverages various technologies such as React, Node.js, MongoDB, and AWS Lambda to provide a seamless user experience while leveraging machine learning to generate accurate predictions. The use of MongoDB to store all the data related to stock prices and predictions provides a scalable and reliable solution for storing large amounts of data.
# Architecture Subsystems

# Stock Price Prediction Subsystem:
- Node.js serves as the initial point of contact when a user enters a stock ticker symbol.
- It validates the entered symbol's correctness.
- Valid data is then communicated to a Flask web server, which executes the Python machine learning prediction algorithm.
- Flask utilizes the yfinance library to fetch real-time stock data.
- The prediction algorithm generates a predicted stock price, which is returned to Node.js. <br />
<br />
In summary, this architecture subsystem seamlessly connects all the backend components. Additionally, it employs Flask and machine learning techniques for stock price prediction, ensuring users receive timely and accurate information for their trading decisions. This subsystem is a fundamental part of our comprehensive system, combining cutting-edge web technologies and machine learning for an optimal user experience.
