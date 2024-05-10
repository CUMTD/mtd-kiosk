# simulates a bunch of kiosks sending heartbeats


ENDPOINT = "https://localhost:7122/heartbeat"

KIOSK_IDS = ["01984b30-1abc-4679-806a-2c226b4564c8", "05d2fbc3-8e79-4044-81c6-6a296228f0fa", "0bc4526a-18ef-402d-b021-736091ff6c94", "1598d566-40d8-4a19-9cc8-23cecc938e4b", "175b4ab7-8467-43a7-8542-595cdf4a34cd", "204ebbd0-ed1e-456c-bc4f-2dfae2eb9ec3", "2b8e125f-dedf-467f-bee9-99f2d9e74667", "305e668a-2934-4578-a79e-a969dd33ea62", "3a115655-6fd3-425e-805a-a9f8fbc79679", "40643e57-d019-4b58-b8ea-c71897784d20", "411143a1-d306-4a22-8b64-8642ea8c0a7a", "49fe2bcf-b11b-4273-a5f6-5743213a4de3", "4a06eba1-d6f1-46c5-b2fb-1620af0350fd", "4a175276-dfbd-49d4-aa2d-3b60b0a82262", "4c428d70-fd19-4528-ab3b-8b4cd628bb34", "4cf34a8e-5a2a-4ed7-b788-1573110fefbc", "55eef8b7-bbbf-4990-9dca-b81d164ee921", "6643231f-8698-4d11-a141-45b35d37bfd5", "6a40e811-349f-4aa8-baed-5a1bbe429b09", "6a7468d9-c4a3-4b78-a9b2-5dabe3783c64", "6da11079-15e5-4020-aa85-1ecd02980415",
             "738fcfff-8d20-44fc-8b6d-996de09f10ed", "7471c8ec-b008-4984-a895-da48af73f514", "80bd221a-2fa4-4134-943a-eb52409c78ff", "83c9dbd5-8b91-4103-8456-1aa762cc5b19", "896b2360-1b6b-457f-9733-e83c5883332c", "a6b7dd6f-e898-4a4b-9d65-0d8696786bdb", "bf9f0647-9631-4496-941b-0ec75552f78f", "bfbe74bc-a11d-4e8d-a2ae-1e65dc8313f2", "da169b34-2ef4-447d-aa05-898df511ac2c", "dc8d0854-99c3-467a-94c4-753d4dfb4913", "dca6deea-cdcb-4544-9be5-e1476e01ccdb", "dd1d8936-2068-4131-92df-a8dc4402e43c", "dfdc8301-0145-4eef-95c6-1254b45bcd64", "f8ae0e9a-7e20-4b60-aad1-3b96f4fe2e63", "fe1c34a9-7169-43e9-868a-c47ebec5d555", "fe482df6-8ed1-46d3-9d30-2dcfacbe3338"]

KIOSK_COMPONENT = [0,1,2]


import requests

import time

import random

import json


def sendHeartbeat(kioskId, kioskComponent):
	response = requests.post(f'{ENDPOINT}', verify=False, json={
		"kioskId": kioskId,
		"type": kioskComponent,
	}, headers= {'X-ApiKey': 'mtddev'})


for kiosk in KIOSK_IDS:
	print(f"Sending heartbeats for kiosk {kiosk}")
	for component in KIOSK_COMPONENT:
		sendHeartbeat(kiosk, component)
		# time.sleep(1)
