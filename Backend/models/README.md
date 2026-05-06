# Model Artifacts

This folder stores the serialized machine learning artifacts used by `Backend/app.py`.

## Runtime compatibility

- The pickled models were generated with `scikit-learn 1.7.2`.
- The backend virtual environment should use the same major/minor version to avoid unpickling errors.
- The app currently expects these files to exist:
  - `crop_model.pkl`
  - `yield_model.pkl`
  - `price_model.pkl`
  - `encoders.pkl`
  - `yield_encoders.pkl`
  - `price_encoders.pkl`
  - `crop_features.pkl`
  - `yield_features.pkl`
  - `price_features.pkl`

## Local startup order

1. Activate the Python 3.11 virtual environment.
2. Run `pip install -r Backend/requirements.txt`.
3. Start the backend with `python Backend/app.py`.
4. Start the frontend from `Frontend 1` with `npm run dev`.
5. Open `http://localhost:5173/` in the browser.

## Notes

- If the backend raises a pickle or version error, reinstall the pinned Python packages and make sure `scikit-learn==1.7.2` is installed.
- Keep these files under version control only if you want to ship the exact trained models with the app.
