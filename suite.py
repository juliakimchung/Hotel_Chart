from DB import reservations_db

def get_suites_from_db():
	data = reservations_db.ReservationData().get_all_reservations_by_rooms()
	print(data)
	suite = open("suite.csv", 'w')
	for d in data:
		el = str(d[1])
		d = (d[0], el)
		myData = ",".join(d)
		print(myData)
		suite.write(myData + "\n")

	suite.close()

	return "yes"

if __name__ == "__main__":

	get_suites_from_db()