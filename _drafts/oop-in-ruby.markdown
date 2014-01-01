---
layout: post
published: true
note: true
title: 'OOP in Ruby'
date: 2013-12-24 04:22:13
tags: Ruby OOP
categories: Ruby
---

# OOP

**Object = Identity + Behaviour + State**

- Encapsulation
  * 物件的 State 狀態被封裝起來
  * 必須透過外在的 Behaviour，也就是 Method 方法來存取操作
- Polymorphism
  * Duck-typing in Ruby
  * 不管物件的類型，只要有相同的介⾯面，就可以呼叫使⽤用

**OOP = objects + messages**

## Class-based OOP

- 物件需要一種方式可以方便生成
- 絕⼤部分的 OO 程式語⾔都支援 class-based
- 是 Object 的 template 樣板
- 是 Object 的 factory 工廠

# Class-oriented?

- 使⽤ class 概念來設計整個系統
- 找出系統的 nouns，以資料為中⼼心，將物件用類別進⾏分類 (Data-centric)
- 愛用繼承架構
- 最後得到系統的 static representation

## Data-centric

- 例如，⼀個 e-commerce 系統：
  * Product
  * Invoice
  * User
- 將需要的⽅法定義在每個類別上

# Object-oriented?

## 是什麼 v.s. 做什麼

- ⼀個物件”是什麼” (Being) 跟作什麼 (Doing) 是分開的概念
- ⼀個物件需要有什麼⽅法，跟當時的⾓色和情境有關係
- Responsibility-centric 以職責為中心，將物件進⾏分類

## Role-oriented

- 不同⾓色有不同責任，需要的方法也就不同
- ⽤單一繼承行不通的，一個物件可能同時有好幾個⾓色

> We represent roles as identifiers ... they (roles) may
> just be pointers to role-bound object, or macros, or
> function or something else.

### Method 1: Object Composition

- ⼀個物件裡包其他物件
- 靜態程式語⾔言的唯一選擇
- 眾多 Design Pattern
- Composition 很強⼤大
- 但是也可以搞的很複雜，特別是參數和狀態如何在物件之間流通

#### Strategy Pattern

相同⽅法，但是不同⾓色有不同演算法時

{% highlight ruby %}
p1 = Person.new(ManagerRole.new)
p2 = Person.new(EmployeeRole.new)
{% endhighlight %}

#### Decorator Pattern

當你想新增物件的⾓色⾏為時

{% highlight ruby %}
p1 = EmployeeRole.new(Person.new)
p2 = ManagerRole.new(Person.new)
{% endhighlight %}

### Method 2: Mixin/Concerns

- 只是 copy-paste ⽽而已
- module 本質上還是繼承 inheritance，不若 composition 容易替換
- [Put chubby models on a diet with concerns](http://37signals.com/svn/posts/3372-put-chubby-models-on-a-diet-with-concerns)

{% highlight ruby %}
module Billingable
  def add_to_billing(billing)
    billing.items << self
  end
end

class Product
  validates_presence_of :name
  include Billingable
end
{% endhighlight %}


## 根據情境來區分物件可以做什麼

- 增加物件的多樣性避免肥大的類別
- [7 Patterns to Refactor Fat ActiveRecord Models - Code Climate Blog](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/)

### Service Object (Command Pattern)

包裝跨 Data Model 的操作

{% highlight ruby %}
class BillingControllers < ApplicationController
  before_filter :find_current_billing

  def add_product
    @product = Product.find(params[:product_id])
    BillingService.new(@billing, @product).perform!
  end
end

class BillingService
  def initialize(billling, product)
    @billling = billling
    @product = product
  end

  def perform!
    add_product_to_billling(@billling, @product)
  end

  private

  def add_product_to_billling(billling, product)
    billling.items << product
  end
end
{% endhighlight %}

### Query Object

包裝複雜的 SQL 查詢

{% highlight ruby %}
class ProductQuery
  def initialize(relation = Product.scoped)
    @relation = relation
  end

  def by_regions(region_ids = nil)
    if region_ids.present?
      countrys = RegionCountry.where(:region_id => region_ids).pluck(:country_alpha2)
      @relation = @relation.where(:country => countrys)
    end
    self
  end
end

@products = ProductQuery.new.by_regions(region_ids)
{% endhighlight %}

### View Object

包裹給 Rails View 使⽤

{% highlight ruby %}
class DashboardView
  def initialize(company)
    @company = company
  end

  def arr
    #...
  end
end
{% endhighlight %}

### Form Object

搭配 Rails 的表單

{% highlight ruby %}
class SignupForm
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations
end

@signup = SignupForm.new(params[:signup])
{% endhighlight %}

## DCI ⾓色+情境

- 將 Behavior 跟 Data model 分開的更徹底
- Data: 資料
  - 例如 Product
- Context: 情境
  - 例如加⼊購物⾞這個 Use case
- Interaction: ⾏為
  - 例如加入購物車這個⽅法
- [“DCI” in Ruby is completely broken](http://tonyarcieri.com/dci-in-ruby-is-completely-broken)

data model 的 behavior，是 run-time 的時候，根據當時的需要動態 extend 進去物件

{% highlight ruby %}
# in controller
class BillingControllers < ApplicationController
  def add_product
    @product = Product.find(params[:product_id])
    BillingContext.new(@billing, @product).perform!
  end
end

# context
class BillingContext
  def initialize(billling, product)
    @billling = billling
    # behavior added to object at runtime
    @product.extend(Billingable)
  end

  def perform!
    @product.add_to_billling(@billling)
  end

  # billingable behavior
  module Billingable
    def add_to_billling(billling)
      billling.items << self
    end
  end
end

# model
class Product < ActiveRecord::Base
  # 注意，這裡不放 Behavior 了
end
{% endhighlight %}

# Conclusion

- 從 Data-Centric 到 Responsibility-centric
- 物件的 Behavior 會因為⾓色和情境⽽需求不同，可以分開。
  ⽽不需要通塞在 data model 上
- 在靜態語⾔中，Composition 是唯⼀解
- 但是在 Ruby 中，善⽤⼀些技巧可以事半功倍
  * Mixins
  * DCI
- 因為 Ruby 把 class 當作 behavior 的容器，
  ⽽不是死的 template，所以可以動態地修改⾏為
