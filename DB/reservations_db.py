import sqlite3
import sys
sys.path.append("../")

class ReservationData():
	"""
	This is a class for reservation data

	"""

	def get_all_reservations_by_rooms(self):
		"""
		This method is to get reservation data
		"""

		with sqlite3.connect("../Hotel/db.sqlite3") as reservation:
			cursor = reservation.cursor()

			try:
				cursor.execute("""SELECT h.name, Count(r.room_id)
													FROM hotel_api_reservation  r , hotel_api_room h
													WHERE r.room_id = h.id
													GROUP BY h.name""")

			except sqlite3.OperationalError:
				pass

			result = cursor.fetchall()

		return result



	def get_all_reservations_by_dates(self):
		"""
		This method is to get reservation data
		"""

		with sqlite3.connect("../Hotel/db.sqlite3") as reservation:
			cursor = reservation.cursor()

			
			cursor.execute("""SELECT r.check_in_date, Count(r.id) AS Counts
													FROM hotel_api_reservation  r 
													WHERE r.check_in_date  BETWEEN '2017-01-01 00:00:00' AND '2017-12-31 00:00:00'
													GROUP BY r.check_in_date
													ORDER BY r.check_in_date """)

			

			result = cursor.fetchall()

		return result


	def get_length_of_stay(self):

		with sqlite3.connect("../Hotel/db.sqlite3") as reservation:
			cursor = reservation.cursor()

			try:
				cursor.execute("""SELECT r.id, julianday(r.check_out_date) - julianday(r.check_in_date) AS stay_len
 													FROM hotel_api_reservation r 
 													ORDER BY r.id """)
			except sqlite3.OperationalError:
				pass

			result = cursor.fetchall()

		return result



	def get_revenue_by_month(self):

		with sqlite3.connect('../Hotel/db.sqlite3')as reservation:
			cursor = reservation.cursor()

			try: 
				cursor.execute("""SELECT SUM( r.total) AS January
													FROM hotel_api_reservation r 
													WHERE r.check_in_date BETWEEN '2017-01-01 00:00:00' AND "2017-01-31 00:00:00"
													GROUP BY SUM(r.total)
													UNION
													SELECT SUM( r.total) AS February
													FROM hotel_api_reservation r 
													WHERE r.check_in_date BETWEEN '2017-02-01 00:00:00' AND "2017-02-27 00:00:00"
													GROUP BY SUM(r.total)
													-- UNION
													-- SELECT SUM( r.total) AS March
													-- FROM hotel_api_reservation r 
													-- WHERE r.check_in_date BETWEEN '2017-03-01 00:00:00' AND "2017-03-31 00:00:00"
													-- GROUP BY SUM(r.total)
													-- UNION
													-- SELECT SUM( r.total) AS April
													-- FROM hotel_api_reservation r 
													-- WHERE r.check_in_date BETWEEN '2017-04-01 00:00:00' AND "2017-04-30 00:00:00"
													-- GROUP BY SUM(r.total)
													-- UNION
													-- SELECT SUM( r.total) AS May
													-- FROM hotel_api_reservation r 
													-- WHERE r.check_in_date BETWEEN '2017-05-01 00:00:00' AND "2017-05-31 00:00:00"
													-- GROUP BY SUM(r.total)
													-- UNION													
													-- SELECT SUM( r.total) AS June
													-- FROM hotel_api_reservation r 
													-- WHERE r.check_in_date BETWEEN '2017-06-01 00:00:00' AND "2017-06-30 00:00:00"
													-- GROUP BY SUM(r.total);
													""")

			except sqlite3.OperationalError:
				pass

			result = cursor.fetchall()

		return result



