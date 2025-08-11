from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from validation.calculators.accuracy import calculate_accuracy


class AccuracyAPIView(APIView):
    def post(self, request):
        try:
            # Extract metadata (pharma context fields)
            metadata = {
                "method": "accuracy",
                "product_name": request.data.get("product_name", ""),
                "label_claim": request.data.get("label_claim", ""),
                "analyst": request.data.get("analyst", ""),
                "date_of_analysis": request.data.get("date_of_analysis", ""),
                "stp_no": request.data.get("stp_no", ""),
                "tis_no": request.data.get("tis_no", "")
            }

            # Extract numeric data
            amount_added = request.data.get("amount_added", [])
            amount_found = request.data.get("amount_found", [])

            # Validate
            if not amount_added or not amount_found or len(amount_added) != len(amount_found):
                return Response({"error": "amount_added and amount_found must be non-empty and equal length."},
                                status=status.HTTP_400_BAD_REQUEST)

            # Call calculator
            result = calculate_accuracy(amount_added, amount_found)

            # Combine metadata + result
            response_data = {**metadata, **result}
            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
