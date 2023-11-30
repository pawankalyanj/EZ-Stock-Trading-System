import React from "react";
import "./About.css";

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <h2>About EZ Stock Trader</h2>

      <section>
        <h3>Overview</h3>
        <p>
          Trading stocks can be a complex and challenging endeavor, especially
          in the face of market volatility. The risk of making the wrong
          investment decisions looms large, leading to potential capital loss,
          damaged reputation, and increased stress for investors. Recognizing
          these challenges, we present our comprehensive solution aimed at
          empowering users to navigate the stock market with confidence.
        </p>
      </section>

      <h3>Key Features</h3>

      <h4>ML & ELO Integration</h4>
      <p>
        Our platform integrates advanced Long-Short Term Memory (LSTM) models,
        customized for individual companies, ensuring precise predictions of
        future stock prices. By combining these models with insights from
        seasoned traders and incorporating the ELO algorithm, the EZ Stock
        Trading System surpasses human capabilities, enhancing overall
        prediction accuracy.{" "}
      </p>

      <h4>Stock Insights</h4>
      <p>
        Users can leverage EZ Stock Trader to gain valuable insights into the
        current stock market. Additionally, they have access to predicted stock
        values for various companies, enabling them to make informed decisions
        on whether to buy or sell stock.
      </p>

      <h4>Real-Time Stock Informatics</h4>
      <p>
        To provide users with accurate historical stock price data, we have
        integrated the Yahoo Finance library into our platform. This ensures
        that traders have access to reliable information for making informed
        investment decisions.
      </p>

      <h4>User-Based Polling System</h4>
      <p>
        Within the EZ Stock Trader system, there exists a user-based polling
        system that enables fellow platform users to cast votes on the
        desirability of buying or selling a specific stock, aiming to optimize
        profits. Through the collective votes, end users gain valuable insights,
        aiding them in making informed decisions on whether to buy or sell the
        stock of their choice.
      </p>

    </div>
  );
};

export default AboutPage;
