import sqlite3


class Guest_db():
	"""
	Guest_db is a class module for  interacting with the Guest table in the Hotel_Api file
	
	"""
	

	def get_all_guest_state(self):
		"""
		This method is to get all guest data
		"""

		with sqlite3.connect('../Hotel/db.sqlite3') as guest:
			cursor = guest.cursor()

			cursor.execute("""SELECT g.state, COUNT(g.state)
												FROM hotel_api_guest g
												GROUP BY g.state""")
			result = cursor.fetchall()

		return result

	
	def get_all_guest_payment_type(self):
		"""
		This method is to get all guest data
		"""

		with sqlite3.connect('../Hotel/db.sqlite3') as payment:
			cursor = payment.cursor()

			cursor.execute("""SELECT p.name, COUNT(p.id)
												FROM hotel_api_paymenttype p
												GROUP BY p.name""")
			result = cursor.fetchall()

		return result