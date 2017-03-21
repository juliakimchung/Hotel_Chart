from DB import guest_db

def get_payment_from_db():
	data = guest_db.Guest_db().get_all_guest_payment_type()
	print(data)
	res = open('paymenttype.csv', 'w')
	for d in data:
		el = str(d[1])
		d = (d[0], el)
		myData = ','.join(d)
		res.write(myData + '\n')
	res.close()

	return 'yes'


if __name__ == "__main__":
	get_payment_from_db()