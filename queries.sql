-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT Category.CategoryName AS Category, Product.ProductName AS Product
FROM [Product]
JOIN Category ON [Product].CategoryId = Category.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records. // DISPLAYING ONLY 329
SELECT [Order].Id AS OrderId, Shipper.CompanyName
FROM [Order]
JOIN Shipper ON [Order].ShipVia = Shipper.Id
WHERE ShippedDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT [Order].Id, [Customer].CompanyName, [Employee].LastName
FROM [Order]
JOIN [Customer], [Employee]
WHERE [Order].CustomerId = [Customer].Id AND [Order].EmployeeId = [Employee].Id


-- SELECT * FROM [Order]

-- SELECT OrderID, CustomerName, OrderDate FROM Orders AS O
-- LEFT JOIN Customers AS C
-- ON O.CustomerId = C.CustomerId;

-- A join is by default inner join

SELECT Employee.FirstName, Employee.LastName, [Order].*, Employee.*
FROM [Order]
JOIN Employee ON [Order].EmployeeId = Employee.Id;

-- list of products including the product name and category name
SELECT Category.CategoryName AS Category, Product.ProductName AS Product
FROM [Product]
JOIN Category ON [Product].CategoryId = Category.Id;

-- list of customers and their orders if they have any
-- Customers left Orders right
select *
from Customer as c
join [Order]as o on c.Id = o.CustomerId
order by c.Id;

-- list of customers that have no orders
-- Left join = bring me all the info even if you dont find any data for certain columns
select *
from Customer as c
left join [Order]as o on c.Id = o.CustomerId
order by c.Id;

select * from [Order]
-- delete from [order]
where CustomerId = 'ALFKI';

/* GROUPING AND AGGREGATIONS */
-- First we group, then we perform an operation on each group

-- how may orders have been processed
select count(*) from [Order];

-- Grouping 
select c.CategoryName as Category
from [Product] as p
join Category as c on p.CategoryId = c.Id
group by c.CategoryName
order by c.CategoryName;

-- what is our cheapest product?
select c.CategoryName as Category, min(p.UnitPrice) as Cheapest
from [Product] as p
join Category as c on p.CategoryId = c.Id
group by c.CategoryName
order by c.CategoryName;

-- what is our most expensive product?
select c.CategoryName as Category, max(p.UnitPrice) as Apple
from [Product] as p
join Category as c on p.CategoryId = c.Id
group by c.CategoryName
order by c.CategoryName;

-- Combined
select c.CategoryName as Category,
count(*) as TotalProducts,
min(p.UnitPrice) as Cheapest,
max(p.UnitPrice) as Apple
from [Product] as p
join Category as c on p.CategoryId = c.Id
group by c.CategoryName
order by c.CategoryName;

-- list customers and the number of the orders they have placed




