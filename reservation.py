from DB import reservations_db

def get_res_from_db():
	data = reservations_db.ReservationData().get_all_reservations_by_dates()
	# print("test from data -get_res_from_db", data)
	res= open('reservation.csv', 'w') 
	for d in data:
		el = str(d[1])
		elm = d[0].split()
		d = (elm[0], el)
		myData = ",".join(d)
		print(myData)
		res.write(myData + '\n') 
	res.close()			

	return "True"



if __name__ == "__main__":

	get_res_from_db()
