import json
from decimal import Decimal
from bson import Decimal128, ObjectId
from flask import Flask, request
from flask_pymongo import PyMongo
from Models import worker, details, diner, balance
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/Diner'
mongo = PyMongo(app)


@app.route('/methods/workers', methods=['GET'])
def get_all_workers():
    worker_coll = mongo.db.Workers
    result = []
    time_result = worker_coll.aggregate(
        [{'$lookup': {'from': 'Balance', 'localField': '_id', 'foreignField': 'workerId', 'as': 'balance'}},
         {'$project': {'_id': 0, 'name': '$name', 'balance': '$balance.balance'}}])
    for field in time_result:
        result.append({'name': field['name'], 'balance': field['balance'][0]})
    return json.dumps(result, ensure_ascii=False, default=str)


@app.route('/methods/workers', methods=['POST'])
def add_workers():
    workers_coll = mongo.db.Workers
    balance_coll = mongo.db.Balance
    result = []
    time_worker = worker.Worker.make_worker({'name': request.get_json()['name']})
    new_worker_id = workers_coll.insert({'name': time_worker.name})
    new_worker = workers_coll.find_one({'_id': new_worker_id})
    time_balance = balance.Balance.make_balance({'workerId': new_worker_id})
    new_balance_id = balance_coll.insert({'workerId': time_balance.workerId, 'balance': time_balance.balance})
    new_balance = balance_coll.find_one({'_id': new_balance_id})
    result.append({'name': new_worker['name'], 'balance': new_balance['balance']})
    return json.dumps(result, ensure_ascii=False, default=str)


@app.route('/methods/diner', methods=['GET'])
def get_diner_loc():
    diner_coll = mongo.db.DinerLocation
    result = []
    second_result = diner_coll.aggregate([
        {'$lookup': {'from': 'Workers', 'localField': 'details.worker.idWorker', 'foreignField': '_id', 'as': 'diner'}},
        {'$project': {
            '_id': 0,
            'diner': {
                '_id': '$_id',
                'title': '$title',
                'date': '$date',
                'details': [{
                    'worker': {
                        'idWorker': '$details.worker.idWorker',
                        'name': '$diner.name'
                    },
                    'given': '$details.given',
                    'get': '$details.get'
                }]
            }
        }
        }
    ])
    for field in second_result:
        time_result = field['diner'][0]
        count = len(time_result['details'][0]['worker']['idWorker'])
        time_details = []
        for i in range(count):
            time_details.append({'worker': {
                            'idWorker': time_result['details'][0]['worker']['idWorker'][i],
                            'name': time_result['details'][0]['worker']['name'][i]
                        },
                        'given': time_result['details'][0]['given'][i],
                        'get': time_result['details'][0]['get'][i]})
        result.append({'_id': time_result['_id'], 'title': time_result['title'], 'date': time_result['date'], 'details': time_details})
    return json.dumps(result, ensure_ascii=False, default=str)


@app.route('/methods/diner', methods=['POST'])
def add_diner():
    diner_coll = mongo.db.DinerLocation
    worker_coll = mongo.db.Workers
    balance_coll = mongo.db.Balance
    result = []
    workers = []
    operation = request.get_json()
    time_details = operation['details']
    count = len(time_details)
    current_balance = Decimal128('0')
    for field in worker_coll.find():
        for i in range(count):
            if field['name'] == time_details[i]['worker']['name']:
                new_balance = Decimal128(Decimal(time_details[i]['given']) + Decimal(time_details[i]['get']))
                current_balance = Decimal128(current_balance.to_decimal() + new_balance.to_decimal())
    if current_balance != Decimal128('0'):
        if current_balance != Decimal128('0.0'):
            return 'Check amount is not 0'
    for field in worker_coll.find():
        for i in range(count):
            if field['name'] == time_details[i]['worker']['name']:
                workers.append({'worker': {'idWorker': field['_id']},
                                'given': time_details[i]['given'], 'get': time_details[i]['get']})
                new_balance = Decimal128(Decimal(time_details[i]['given']) + Decimal(time_details[i]['get']))
                if new_balance != Decimal128('0.0'):
                    balance_now = balance_coll.find_one({'workerId': field['_id']})
                    time_balance = Decimal128(balance_now['balance'].to_decimal() + new_balance.to_decimal())
                    balance_coll.update_one({'_id': balance_now['_id']}, {'$set': {'balance': time_balance}})
    time_diner = diner.Diner.make_diner({'title': operation['title'], 'date': operation['date'], 'details': workers})
    data = {'title': time_diner.title, 'date': time_diner.date, 'details': time_diner.details}
    diner_coll.insert(data)
    result.append(data)
    return json.dumps(result, ensure_ascii=False, default=str)


@app.route('/methods/diner/<diner_id>', methods=['DELETE'])
def delete_diner(diner_id):
    diner_col = mongo.db.DinerLocation
    result = []
    diner_col.delete_one({'_id': ObjectId(diner_id)})
    result.append(diner_id)
    return json.dumps(result, ensure_ascii=False, default=str)


if __name__ == '__main__':
    app.run()
