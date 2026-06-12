import streamlit as st

st.set_page_config(
    page_title="CKD Detection Dashboard",
    page_icon="🩺",
    layout="wide"
)

st.write("# Welcome to the CKD Detection Dashboard! 🩺")

st.sidebar.success("Select a page above.")

st.markdown(
    """
    This dashboard provides an interactive interface for exploring the Chronic Kidney Disease (CKD) dataset 
    and predicting CKD using our trained Machine Learning models (Random Forest).

    ### Features:
    - **EDA (Exploratory Data Analysis)**: Visualize the clinical features, distributions, and correlations.
    - **Prediction**: Input patient data and get a real-time prediction using the FastAPI backend.

    👈 **Select a page from the sidebar to get started!**
    """
)
