# Workshop 4 – Communication inter-services avec OpenFeign

🎓 **Formation : Microservices**  
📅 **Année universitaire : 2026–2027**  
🧑‍💻 **Workshop 4**

---

## 🎯 Objectif du workshop

L’objectif de ce workshop est de mettre en place la communication inter-microservices en utilisant **Spring Cloud OpenFeign**.

À la fin de ce workshop, l’étudiant sera capable de :

- Comprendre le principe de communication synchrone entre microservices
- Configurer et utiliser OpenFeign
- Intégrer Eureka pour la découverte dynamique des services
- Implémenter un endpoint enrichi (agrégation de données)
- Respecter les bonnes pratiques d’architecture microservices

---

## 🧩 Architecture mise en place

Dans ce workshop, nous mettons en œuvre :

- 🖥️ Un **Eureka Server**
- 📦 Microservice **Job**
- 👤 Microservice **Candidat**
- 📑 Microservice **Candidature**
- 🔁 Communication inter-services via **OpenFeign**

Le microservice **Candidature** :

- Stocke uniquement `jobId` et `candidatId`
- Récupère les informations complètes via Feign
- Propose un endpoint enrichi `/details`

---

## 🔄 Principe de fonctionnement

1. Le client appelle le microservice **Candidature**.
2. Le service récupère les données locales.
3. Il interroge dynamiquement :
    - Le microservice **Job**
    - Le microservice **Candidat**
4. Il retourne une réponse enrichie combinant les données.

---

## 🛠️ Technologies utilisées

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Spring Web (REST)
- Spring Cloud OpenFeign
- Spring Cloud Netflix Eureka
- MySQL
- Maven
- IntelliJ IDEA

---

## 📄 Énoncé du workshop

L’énoncé détaillé du Workshop 4 est disponible au format PDF :

👉 [Télécharger l’énoncé du Workshop 2](https://github.com/badi3a/AWD-Training/blob/W04-OpenFeign/Atelier%20Communication%20entre%20MS%20avec%20OpenFeign.pdf)

---

## 📝 Travail à faire (Rendu)

- Configurer Eureka Server
- Créer les microservices Job, Candidat et Candidature
- Activer OpenFeign dans le microservice Candidature
- Implémenter les Feign Clients
- Créer un endpoint enrichi `/candidature/{id}/details`
- Tester la communication inter-services


---

## 🧠 Concepts abordés

- Architecture microservices
- Communication synchrone
- Découverte de services
- DTO vs Entity
- Références distantes par identifiant
- Agrégation de données distribuées

---

## ✅ Rendu attendu

- Eureka fonctionnel
- Microservices correctement enregistrés
- Communication Feign opérationnelle
- Endpoint enrichi fonctionnel
- Code structuré et respectant les bonnes pratiques
- Projet poussé sur **GitHub**

---

💡 **Conseil :**  
Démarrez toujours le serveur Eureka avant de lancer l’API Gateway et les microservices.

🚀 Bon courage et bonne implémentation !

---

## 🏫 Cadre pédagogique

### Enseignante : [Badia Bouhdid](https://www.linkedin.com/in/badiabouhdid)

Ce workshop a été développé dans le cadre du module **Applications Web Distribuées**,  
à l’**École d’Ingénieurs ESPRIT**.
