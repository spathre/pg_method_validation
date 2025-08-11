from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from validation.calculators.linearity import calculate_linearity


class LinearityAPIView(APIView):
    def post(self, request):
        try:
            # Extract metadata
            metadata = {
                "method": "linearity",
                "product_name": request.data.get("product_name", ""),
                "label_claim": request.data.get("label_claim", ""),
                "analyst": request.data.get("analyst", ""),
                "date_of_analysis": request.data.get("date_of_analysis", ""),
                "stp_no": request.data.get("stp_no", ""),
                "tis_no": request.data.get("tis_no", "")
            }

            # Extract input data
            x = request.data.get("x", [])
            y = request.data.get("y", [])

            # Validate
            if not x or not y or len(x) != len(y):
                return Response({"error": "Invalid input: 'x' and 'y' must be non-empty and equal length"},
                                status=status.HTTP_400_BAD_REQUEST)

            # Perform calculation
            result = calculate_linearity(x, y)

            # Merge and respond
            response_data = {**metadata, **result}
            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
