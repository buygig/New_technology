import Distribution.Simple.Utils (xargs)

doubleMe x = x * 2

doubleUs x y = doubleMe x + doubleMe y

doubleSameNumber x =
  if x > 100
    then x
    else x * 2

doubleSameNumber' x = (if x > 100 then x else x * 2) + 1

b = [[1, 2, 3, 4], [2, 2, 3, 4], [3, 2, 3, 4]]

boomBangs xs = [if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]

length' xs = sum [1 | _ <- xs]

factorial :: Integer -> Integer
factorial n = product [1 .. n]

lucky :: (Integral a) => a -> String
lucky 7 = "LUCKY NUMBER SEVEN!"
lucky x = "Sorry, you're out of lucky"

sayMe :: (Integral a) => a -> String
sayMe 1 = "One"
sayMe 2 = "Two"
sayMe 3 = "Three"
sayMe 4 = "Four"
sayMe 5 = "Five"
sayMe x = "Not between 1 and 5"

fib :: Integer -> Integer
fib 0 = 0
fib 1 = 1
fib n = fib (n - 2) + fib (n - 1)

head' :: [a] -> a
head' [] = error "Can't call head on an empty list"
head' (x : _) = x

sum' :: (Num a) => [a] -> a
sum' [] = 0
sum' (x : xs) = x + sum' xs

sum'' :: (Num a) => [a] -> a
sum'' = foldl (+) 0

quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x : xs) =
  let smallerSorted = quicksort [a | a <- xs, a <= x]
      biggerSorted = quicksort [a | a <- xs, a > x]
   in smallerSorted ++ [x] ++ biggerSorted

multThree :: (Num a) => a -> a -> a -> a
multThree x y z = x * y * z

increasing :: (Ord a) => [a] -> Bool
increasing [] = True
increasing [x] = True
increasing (x : y : ys) = x <= y && increasing (y : ys)

increasing' :: (Ord a) => [a] -> Bool
increasing' xs =
  if xs == []
    then True
    else
      if tail xs == []
        then True
        else
          if head xs <= head (tail xs)
            then increasing (tail xs)
            else False

increasing'' :: (Ord a) => [a] -> Bool
increasing'' xs
  | null xs = True
  | null (tail xs) = True
  | head xs <= head (tail xs) = increasing'' (tail xs)
  | otherwise = False

maximum' :: (Ord a) => [a] -> a
maximum' [] = error "empty list"
maximum' [x] = x
maximum' (x : xs) = max x (maximum' xs)

elem' :: Eq t => t -> [t] -> Bool
elem' a [] = False
elem' a (x : xs)
  | x == a = True
  | otherwise = elem' a xs

quicksort' :: (Ord a) => [a] -> [a]
quicksort' [] = []
quicksort' (x : xs) =
  let small = quicksort [a | a <- xs, a <= x]
      bigger = quicksort [a | a <- xs, a > x]
   in small ++ [x] ++ bigger

quicksort'' :: (Ord a) => [a] -> [a]
quicksort'' [] = []
quicksort'' (x : xs) =
  let small = quicksort (filter (<= x) xs)
      bigger = quicksort (filter (> x) xs)
   in small ++ [x] ++ bigger

quicksort''' :: (Ord a) => [a] -> [a]
quicksort''' [] = []
quicksort''' (x : xs) =
  let small = quicksort $ filter (<= x) xs
      bigger = quicksort $ filter (> x) xs
   in small ++ [x] ++ bigger

fn :: Num a => a -> a
fn x = x * x

compare10 :: Integer -> Ordering
compare10 = compare 10

divByTen :: Fractional a => a -> a
divByTen = (/ 10)

isUpperCase :: Char -> Bool
isUpperCase = (`elem` ['A' .. 'Z'])

apllyTwice :: (a -> a) -> a -> a
apllyTwice f x = f (f x)

zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x : xs) (y : ys) = f x y : zipWith' f xs ys

flip' :: (t1 -> t2 -> t3) -> t2 -> t1 -> t3
flip' f x y = f y x