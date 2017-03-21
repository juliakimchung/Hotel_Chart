from DB import reservations_db

def get_length_from_db():
	data = reservations_db.ReservationData().get_length_of_stay()
	length = open('len.csv', 'w')
	for d in data:
		el = int(d[1])
		dl = str(d[0])
		elm = str(el)
		# print(elm)
		d = (dl, elm)
		myData = ",".join(d)
		length.write(myData + '\n')
	length.close()

	return "yes"





if __name__ == "__main__":

	get_length_from_db()