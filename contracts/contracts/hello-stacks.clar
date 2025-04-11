
;; title: hello-stacks
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;;

;; constants
;;

;; data vars
;;

;; data maps
;;

;; public functions
;;

;; read only functions
;;

;; private functions
;;

(define-public (write-message (message (string-utf8 500)))  
(begin       
(print message)     
(ok "Message printed")   
)
)

(define-public (salute)
(ok (print {msg: "Hello, Stacks!", tip: stacks-block-height, sender: tx-sender}))
)