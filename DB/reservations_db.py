import sqlite3
import sys
sys.path.append("../")

class ReservationData():
	"""
	This is a class for reservation data

	"""

	def get_all_reservations_by_rooms(self, reservation):
		"""
		This method is to get reservation data
		"""

		with sqlite3.connect("hotel_api.db") as reservation:
			cursor = reservation.cursor()

			try:
				cursor.execute("""SELECT h.name, Count(r.room_id)
													FROM hotel_api_reservation  r , hotel_api_room h
													WHERE r.room_id = h.id
													GROUP BY h.name""")

			except sqlite3.OperationalError:


	def get_all_reservations_by_dates(self, reservation):
		"""
		This method is to get reservation data
		"""

		with sqlite3.connect("hotel_api.db") as reservation:
			cursor = reservation.cursor()

			try:
				cursor.execute("""SELECT r.id, Count(r.id)
													FROM hotel_api_reservation  r
													WHERE r.check_in_date  BETWEEN '2017-03-01 00:00:00' AND '2017-03-31 00:00:00 """)

			except sqlite3.OperationalError:

