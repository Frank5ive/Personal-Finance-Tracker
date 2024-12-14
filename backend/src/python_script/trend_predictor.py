import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tools.sm_exceptions import ConvergenceWarning
import warnings
import sys
from sklearn.linear_model import LinearRegression

# Suppress warnings related to convergence issues with ARIMA
warnings.simplefilter('ignore', ConvergenceWarning)

# Preprocess the data (strip spaces from column names, handle missing values, and sort data by date)
def preprocess_data(df):
    print("Column names before stripping:", df.columns)
    df.columns = df.columns.str.strip()  # Remove extra spaces
    print("Column names after stripping:", df.columns)

    df.dropna(inplace=True)  # Handle missing values

    # Convert 'Date' to datetime and extract date parts
    df['Date'] = pd.to_datetime(df['Date'])
    df['month'] = df['Date'].dt.month
    df['year'] = df['Date'].dt.year
    df['day'] = df['Date'].dt.day

    # Sort the data by 'Date' to ensure chronological order
    df = df.sort_values(by='Date')

    print("Data after preprocessing:", df.head())
    return df

# Apply Linear Regression (for trend detection)
def linear_regression(df):
    # Convert date to ordinal for regression
    df['date_ordinal'] = df['Date'].apply(lambda x: x.toordinal())  
    X = df[['date_ordinal']]  # Independent variable
    y = df['Amount']  # Dependent variable
    
    # Create and fit the linear regression model
    model = LinearRegression()
    model.fit(X, y)
    
    # Add predictions to DataFrame
    df['prediction'] = model.predict(X)
    return model, df

# Forecast using ARIMA
def arima_forecast(df, forecast_days=365):
    if len(df) < 5:
        raise ValueError("Not enough data to build ARIMA model. Please provide more than 5 data points.")
    
    # Fit ARIMA model with order (p, d, q) and check if it fits successfully
    try:
        model = ARIMA(df['Amount'], order=(5, 1, 0))  # Order can be tuned
        model_fit = model.fit()
    except Exception as e:
        print(f"ARIMA model fitting failed: {e}")
        return pd.DataFrame()  # Return empty DataFrame if model fitting fails

    # Forecast for the next 'forecast_days' days
    forecast = model_fit.forecast(steps=forecast_days)
    
    # Create forecast DataFrame
    forecast_dates = pd.date_range(df['Date'].max() + pd.Timedelta(days=1), 
                                   periods=forecast_days, freq='D')
    forecast_df = pd.DataFrame({'forecast': forecast}, index=forecast_dates)
    return forecast_df

# Main function
def main():
    try:
        # Load the CSV file
        df = pd.read_csv('MOCK_DATA(1).csv')  # Replace with your file path
    except Exception as e:
        print(f"Error reading data: {e}")
        sys.exit(1)

    # Preprocess the data
    df = preprocess_data(df)

    # Apply models
    model, prediction_df = linear_regression(df)
    forecast_df = arima_forecast(df, forecast_days=365)

    # Save results to CSV
    prediction_df.to_csv('transaction_predictions.csv', index=False)
    if not forecast_df.empty:
        forecast_df.to_csv('forecast_predictions.csv', index=False)

    # Plot results
    print("Plotting the data...")
    dates = np.array(df['Date'])
    amounts = np.array(df['Amount'])

    plt.figure(figsize=(12, 6))

    # Plot actual data
    plt.plot(dates, amounts, label="Actual Amounts", marker='o', color='blue', linewidth=2)

    # Plot linear regression trend
    plt.plot(dates, np.array(prediction_df['prediction']), 
             label="Trend (Linear Regression)", linestyle='dashed', color='green', linewidth=2)

    # Debug: Check forecast data
    if not forecast_df.empty:
        forecast_dates = np.array(forecast_df.index)
        forecast_values = np.array(forecast_df['forecast'])
        print("Forecast Dates (ARIMA):")
        print(forecast_dates)
        print("Forecast Values (ARIMA):")
        print(forecast_values)

        # Plot ARIMA forecast
        plt.plot(forecast_dates, forecast_values, 
                 label="Forecast (ARIMA)", linestyle='dotted', color='red', linewidth=2)
    else:
        print("Warning: ARIMA forecast data is empty!")

    # Add Graph Explanation
    plt.text(
        dates.min(), amounts.max() * 1.1,
        ("Graph Explanation:\n"
         "- Blue Line: Actual Transaction Amounts\n"
         "- Green Dashed Line: Trend predicted using Linear Regression\n"
         "- Red Dotted Line: Forecast for future transactions (ARIMA)"),
        fontsize=10, color='black', bbox=dict(facecolor='white', alpha=0.8)
    )

    # Customize the plot
    plt.legend(fontsize=12)
    plt.xlabel('Date', fontsize=12)
    plt.ylabel('Transaction Amount', fontsize=12)
    plt.title('Transaction Amount Trends and Forecast', fontsize=16, weight='bold')
    plt.xticks(rotation=45, fontsize=10)
    plt.yticks(fontsize=10)
    plt.tight_layout()
    
    # Save and show the plot
    plt.savefig('trend_forecast.png')
    plt.show()

if __name__ == "__main__":
    main()
