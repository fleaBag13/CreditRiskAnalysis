from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, ExtraTreesRegressor
import warnings
import pandas as pd

app = Flask(__name__)
CORS(app)

# Initialize regressors
Regressors = {
    'Random Forest Regression': RandomForestRegressor(random_state=42),
    'Gradient Boosting Regression': GradientBoostingRegressor(random_state=42),
    'Extra Trees Regression': ExtraTreesRegressor(random_state=42),
}

# Dummy data for demonstration purposes
# Replace this with your actual training data
X_loan_amt_train_prep = pd.read_csv('F:\MPR Projects\CreditRisk\model\X_loan_amt_train_prep.csv')
y_loan_amt_train_prep = pd.read_csv('F:\MPR Projects\CreditRisk\model\y_loan_amt_train_prep.csv')

# Train the regressors
for model_name, model in Regressors.items():
    model.fit(X_loan_amt_train_prep, y_loan_amt_train_prep)

# Endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print(data)
    # Extract X values from the request
    X_new = data['X_values']

    # Feature names in the same order as your training data
    feature_names = ['Gender_F', 'Gender_M', 'Profession_Commercial associate', 'Profession_Pensioner',
                     'Profession_State servant', 'Profession_Working', 'Location_Rural', 'Location_Semi-Urban',
                     'Location_Urban', 'Expense Type 1_N', 'Expense Type 1_Y', 'Expense Type 2_N', 'Expense Type 2_Y',
                     'Has Active Credit Card_Active', 'Has Active Credit Card_Inactive', 'Has Active Credit Card_Unpossessed',
                     'Property Location_Rural', 'Property Location_Semi-Urban', 'Property Location_Urban',
                     'Income Stability_High', 'Income Stability_Low', 'Age', 'Income (USD)',
                     'Current Loan Expenses (USD)', 'Dependents', 'Credit Score', 'No. of Defaults', 'Property Age',
                     'Property Type', 'Co-Applicant', 'Property Price']

    # Make predictions
    predictions = {}
    for model_name, model in Regressors.items():
        with warnings.catch_warnings():
            # Ignore the specific warning
            warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

            y_pred = model.predict([X_new])
        predictions[model_name] = y_pred[0]

    # Return predictions as a JSON response
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True,port= 5001)
