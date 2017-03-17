import sqlite3
import sys
sys.path.append("../")

class Guest_db():
	"""
	Guest_db is a class module for  interacting with the Guest table in the Hotel_Api file
	
	"""
	

	def get_all_guest_state(self):
		"""
		This method is to get all guest data
		"""

		with sqlite3.connect('hotel_api_guest.db') as guest:
			cursor = proc.cursor()

			cursor.execute("""SELECT g.state, COUNT(g.state)
												FROM hotel_api_guest g
												GROUP BY g.state""")
			result = cursor.fetchall()

		return results