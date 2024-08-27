export SERVICE_NAME=""
export PROJECT_ID=""
export IMAGE_TAG=""

export REGION="us-south1"

gcloud config set project $PROJECT_ID

gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_TAG

if [ $? -eq 0 ]; then
	gcloud run deploy $SERVICE_NAME \
		--image gcr.io/$PROJECT_ID/$IMAGE_TAG \
		--region $REGION \
		--platform managed \
		--port=3000 \
		--allow-unauthenticated
fi
