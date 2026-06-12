import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

st.set_page_config(page_title="EDA", page_icon="📊", layout="wide")

st.markdown("# Exploratory Data Analysis 📊")

@st.cache_data
def load_data():
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data_path = os.path.join(base_dir, 'ckd.csv')
    df = pd.read_csv(data_path)
    return df

try:
    df = load_data()
    st.write("### Raw Dataset Preview")
    st.dataframe(df.head(15))
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.write("### Target Distribution")
        fig, ax = plt.subplots(figsize=(6, 4))
        sns.countplot(data=df, x='Class', ax=ax, palette='muted')
        st.pyplot(fig)
    
    with col2:
        st.write("### Numeric Features Distribution")
        numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
        selected_col = st.selectbox("Select a numeric feature to view its distribution", numeric_cols)
        
        fig2, ax2 = plt.subplots(figsize=(6, 4))
        sns.histplot(data=df, x=selected_col, hue='Class', kde=True, ax=ax2, palette='muted')
        st.pyplot(fig2)
    
except Exception as e:
    st.error(f"Error loading dataset: {e}")
