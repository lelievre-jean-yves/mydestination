# Data dictionnary

## Hotel

|Champ|Type|Spécificités|Description|
|-|-|-|-|
| id | INT | PRIMARY KEY, AUTO INCREMENT, NOT NULL, UNSIGNED | id of the Hotel |
| name | VARCHAR(255) | NOT NULL | name of the Hotel |
| picture | VARCHAR(2083) | | url to an image for the hotel |
| home_order | TINYINT(4) |  DEFAULT 0 | order of the hotel on homepage |
| description | VARCHAR(1000) | | description of the hotel
| ranking | TINYINT | NOT NULL |Ranking of the Hotel |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | date of creation of the hotel |
| updated_at | TIMESTAMP | | last update date of the hotel |
| address | VARCHAR(256) | NOT NULL | adress of the hotel |

## Activity

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|id of the activity|
|name|VARCHAR(64)|NOT NULL, UNIQUE| name of the activity|
|description|TEXT|| description of activity|
|picture|VARCHAR(2083)||url to an image for the activity|
|price|DECIMAL(10,2)|NOT NULL, DEFAULT 0|price of the activity|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP| date of creation of the activity|
|updated_at|TIMESTAMP|| last update date of the  activity|

## Room

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|id of the room|
|description |VARCHAR(100)|NOT NULL  |description of the room|
|price|DECIMAL(10,2)|NOT NULL, DEFAULT 0|price of the Room|
|surface|TINYINT|NOT NULL, DEFAULT 0|surface of the Room|
|numberOfBed|TINYINT|DEFAULT 0|number of bed in the Room|
|picture|VARCHAR(2083)| |url to an image for the room|
|created_at|TIMESTAMP|DEFAULT CURRENT_TIMESTAMP|date of creation of the room|
|updated_at|TIMESTAMP| |last update date of the  room|

## Service

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|id of service|
|name |VARCHAR(100)|NOT NULL, UNIQUE  |name service|
|price|DECIMAL(10,2)|NOT NULL, DEFAULT 0|price of the service|
|picture|VARCHAR(2083)||url to an image for the service|
|description|TEXT|| description of service|
|created_at|TIMESTAMP|DEFAULT CURRENT_TIMESTAMP|date of creation of the service|
|updated_at|TIMESTAMP| |last update date of the  service|

## User

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|id of user|
|firstname |VARCHAR(100)|NOT NULL  |firstname user|
|lastname |VARCHAR(100)|NOT NULL  |lastname user|
| age | TINYINT | NOT NULL | age of the user|
|email |VARCHAR(100)|NOT NULL, UNIQUE |email user|
|password |VARCHAR(100)|NOT NULL |password user|
|created_at|TIMESTAMP|DEFAULT CURRENT_TIMESTAMP|date of creation of the user|
|updated_at|TIMESTAMP| |last update date of the  user|

## Reservation_Room

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|id of reservation|
| user | ENTITY | NOT NULL  | id user |
| room | ENTITY | NOT NULL| id room |
|arrivalDate|TIMESTAMP|NOT NULL|date of arrival|
|departureDate|TIMESTAMP|NOT NULL|date of departure|
|numberOfPeople|TINYINT|NOT NULL| number of people |
|created_at|TIMESTAMP|DEFAULT CURRENT_TIMESTAMP|date of creation of the user|
|updated_at|TIMESTAMP| |last update date of the  user|

## Reservation_Activty

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|id of reservation|
|user |ENTITY|NOT NULL  |id user|
|activity|ENTITY|NOT NULL|id activity|
|dateStart |TIMESTAMP|NOT NULL  |id user|
|duration|TIMESTAMP|NOT NULL|duration of the activity|
|numberOfPeople|TINYINT|NOT NULL| number of people |
|created_at|TIMESTAMP|DEFAULT CURRENT_TIMESTAMP|date of creation of theReservation_Activty|
|updated_at|TIMESTAMP| |last update date of the  Reservation_Activty|

## Activity_Hotel

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|activity|ENTITY|NOT NULL| id activity|
|hotel|ENTITY|NOT NULL| id hotel|

## Hotel_Service

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|service|ENTITY|NOT NULL| id service|
|hotel|ENTITY|NOT NULL| id hotel|

## Hotel_Room

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|room|ENTITY|NOT NULL| id room|
|hotel|ENTITY|NOT NULL| id hotel|